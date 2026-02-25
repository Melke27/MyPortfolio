const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const path = require('path');

// Enable CORS for all origins
app.use(cors());

// Middleware - must be before routes
app.use(express.json());

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' }
});

const Contact = mongoose.model('Contact', contactSchema);

// Subscriber Schema
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Import routes
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const certRoutes = require('./routes/certifications');
const expRoutes = require('./routes/experiences');
const testimonialRoutes = require('./routes/testimonials');

// API Routes - BEFORE static files
app.use('/api', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certifications', certRoutes);
app.use('/api/experiences', expRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Subscribers API
app.get('/api/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/subscribers/:id', async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscriber deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Serve static files from parent directory (after API routes)
app.use(express.static(path.join(__dirname, '..')));

// Serve admin.html
app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'admin.html'));
});

// Serve login.html
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'login.html'));
});

// Test endpoint for blog
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working', routes: 'blogRoutes loaded' });
});

// Subscribe to Newsletter
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      console.error('Validation Error: Email is required for subscription.');
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Validation Error: Invalid email format for subscription.');
      return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      console.warn(`Subscription Warning: Email ${email} already subscribed.`);
      return res.status(409).json({ success: false, message: 'You are already subscribed!' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Send confirmation email if configured
    if (process.env.BREVO_API_KEY) {
      try {
        const SibApiV3Sdk = require('@sendinblue/client');
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
        await apiInstance.sendTransacEmail({
          sender: { email: 'melkamuwako5@gmail.com', name: 'Portfolio Contact' },
          to: [{ email: email, name: 'Melkamu Wako' }],
          subject: 'Thank you for subscribing!',
          htmlContent: `
                        <h2>Hello!</h2>
                        <p>Thank you for subscribing to my newsletter. You will receive updates, articles, and resources directly to your inbox.</p>
                        <p>Best regards,<br/>Melkamu Wako</p>
                    `
        });
        console.log('Confirmation email sent to new subscriber:', email);
      } catch (emailError) {
        console.error('Error sending confirmation email via Brevo HTTP API:', emailError);
        // Do not fail the subscription if confirmation email fails
      }
    }

    res.status(201).json({ success: true, message: 'Subscription successful!' });
  } catch (error) {
    console.error('Error in /api/subscribe endpoint:', error);
    res.status(500).json({ success: false, message: 'Internal server error: Subscription failed.' });
  }
});

// --- Chatbot Logic (from simple-chat.js) ---
const MELKAMU_SYSTEM_PROMPT = `You are melke27 AI Assistant, the personal AI assistant for Melkamu Wako's portfolio website. You are knowledgeable, friendly, and professional.

## About Melkamu Wako
- Computer Science & Engineering student at Adama Science and Technology University (ASTU), Ethiopia
- Passionate fullstack web developer with experience in modern web technologies
- Active member of CSEC ASTU (Computer Science & Engineering Club) and Team Alpha Robotics ASTU
- Email: melkamuwako5@gmail.com
- GitHub: github.com/melke27

## Technical Skills
- Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, responsive design, UI/UX
- Backend: Node.js, Express.js, Java (Spring Boot basics)
- Databases: MySQL, MongoDB, SQLite
- Languages: JavaScript, Python, Java, C++, C#, HTML/CSS
- Tools: Git, VS Code, REST APIs
- Currently learning: Cybersecurity, Ethical Hacking (Cisco Networking Academy)

## Projects
1. **EthioHeritage360** - National-scale digital heritage platform built during INSA Summer Camp 2025. Tech: React, Node.js, Express, MongoDB, 3D/AR, multilingual, analytics. Melkamu was a fullstack developer on this team project.
2. **Grade Management System** - Full-stack app with role-based login (admin, student, teacher). Tech: React.js, Node.js, Express, MongoDB. Features: grade entry, student profiles, secure authentication.
3. **Portfolio Website** - This website! Built with HTML, CSS, JavaScript. Responsive design for all devices.
4. **Weather App** - Weather application. GitHub: github.com/melke27/weather-app
5. **E-Commerce Store** - Enhanced e-commerce site. GitHub: github.com/melke27/enhanced-ecommerce-store
6. **Digital Clock with House Design** - Python GUI project using Tkinter and custom graphics.
7. **Secure Login System** - Node.js app demonstrating password hashing, session control, and secure database interaction.

## Achievements
- 🥈 2nd Place at the 2025 African Robotics Championship (Team Alpha Robotics ASTU)
- Official graduate of INSA Summer Camp 2025 full-stack development track
- Active competitive programmer on Codeforces and LeetCode (C++ specialist)
- Peer mentor for junior students in C++ and Data Structures & Algorithms
- Recognized as top peer-mentor within CSEC ASTU

## Certifications
- INSA Summer Camp 2025 - Full-Stack Web Development
- Cisco Networking Academy - Introduction to Cybersecurity
- Coursera - Full-Stack Web Development
- FreeCodeCamp - JavaScript Algorithms and Data Structures

Rules:
- Answer questions about Melkamu, his projects, skills, and achievements accurately using the info above.
- For general tech questions, answer helpfully as an AI assistant.
- Be concise but thorough.
- At the end of every reply, add: "Created by Melkamu Wako, Fullstack Developer. Contact: melkamuwako5@gmail.com"`;

async function askOpenRouter(message) {
  const models = [
    'google/gemma-2-9b-it',
    'meta-llama/llama-3-8b-instruct',
    'mistralai/mistral-7b-instruct'
  ];
  let lastError = null;
  for (const model of models) {
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: model,
          messages: [
            { role: 'system', content: MELKAMU_SYSTEM_PROMPT },
            { role: 'user', content: message }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      let reply = response.data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
      const footer = "\n\nCreated by Melkamu Wako, Fullstack Developer. Contact: melkamuwako5@gmail.com";
      if (!reply.includes("Created by Melkamu Wako")) {
        reply += footer;
      }
      return reply;
    } catch (err) {
      console.error(`OpenRouter API error with model ${model}:`, err.response ? err.response.data : err.message);
      lastError = err;
    }
  }
  throw lastError;
}

app.post('/chat', async (req, res) => {
  console.log('--- /chat endpoint hit ---');
  console.log('Request body:', req.body);
  console.log('User-Agent:', req.headers['user-agent']);
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: 'AI server misconfiguration: OPENROUTER_API_KEY is missing.' });
  }
  // Custom about-me reply
  if (/about (you|melkamu|yourself)/i.test(message) || /melkamu wako/i.test(message)) {
    return res.json({
      reply: "I'm Melkamu Wako's AI assistant. Melkamu Wako is a Computer Science and Engineering student and passionate fullstack developer from Ethiopia. He has experience with JavaScript, React, Python, Java, C++, C#, and HTML/CSS. His projects include a weather app, e-commerce site, grade management system, and more.\n\nCreated by Melkamu Wako, Fullstack Developer. Contact: melkamuwako5@gmail.com"
    });
  }
  try {
    const reply = await askOpenRouter(message);
    res.json({ reply });
  } catch (error) {
    console.error('Error in /chat endpoint:', error);
    if (error.response && error.response.data) {
      return res.status(500).json({ error: 'AI request failed', details: error.response.data });
    }
    res.status(500).json({ error: 'AI request failed', details: error.message });
  }
});

// --- Visitor Notification Endpoint (Telegram Bot) ---

function sendTelegramNotification(message) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    console.error('Telegram credentials not set.');
    return Promise.resolve(); // Prevents breaking the flow if not set
  }
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  return axios.post(url, {
    chat_id: chatId,
    text: message,
  });
}

// Homepage route: notify on every visit
app.get('/', (req, res) => {
  sendTelegramNotification('👀 Someone visited your portfolio!')
    .then(() => console.log('Telegram notification sent!'))
    .catch(err => console.error('Telegram error:', err.response ? err.response.data : err));
  res.send('Portfolio backend is running!');
});

// POST endpoint for frontend-triggered notification
app.post('/notify-visit', (req, res) => {
  const name = req.body.name || 'Unknown visitor';
  const device = req.body.device || 'Unknown device';
  const browser = req.body.browser || 'Unknown browser';
  const ip = req.body.ip || 'Unknown IP';
  const city = req.body.city || '';
  const region = req.body.region || '';
  const country = req.body.country || '';
  const location = [city, region, country].filter(Boolean).join(', ');
  const message = `👀 ${name} visited your portfolio!\nDevice: ${device}\nBrowser: ${browser}\nIP: ${ip}\nLocation: ${location}`;
  sendTelegramNotification(message)
    .then(() => res.json({ success: true }))
    .catch(err => {
      console.error('Telegram error:', err.response ? err.response.data : err);
      res.status(500).json({ success: false });
    });
});

// --- Visitor Counter ---
let onlineVisitors = 0;

// Middleware to increment/decrement visitor count
app.use((req, res, next) => {
  if (req.path === '/api/visitors') return next(); // avoid loop
  onlineVisitors = Math.max(onlineVisitors, 0);
  next();
});

// Simple polling endpoint for online visitors
app.get('/api/visitors', (req, res) => {
  res.json({ count: onlineVisitors });
});

// Track online visitors using a simple in-memory approach
// Increment on each new page load (frontend should ping this endpoint)
app.post('/api/visitors', (req, res) => {
  onlineVisitors++;
  res.json({ success: true, count: onlineVisitors });
});

// Decrement when user leaves (frontend should call this on unload)
app.delete('/api/visitors', (req, res) => {
  onlineVisitors = Math.max(onlineVisitors - 1, 0);
  res.json({ success: true, count: onlineVisitors });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global server error handler:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected internal server error occurred.'
  });
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Configured' : 'Not configured');
  console.log('Brevo API key configured:', !!process.env.BREVO_API_KEY);
  console.log('TELEGRAM_BOT_TOKEN:', process.env.TELEGRAM_BOT_TOKEN ? 'Configured' : 'Not configured');
  console.log('TELEGRAM_CHAT_ID:', process.env.TELEGRAM_CHAT_ID ? 'Configured' : 'Not configured');
});

// Integrate Brevo contact endpoint
try {
  const brevoContact = require('./brevo-contact');
  app.use('/', brevoContact);
} catch (e) {
  console.warn('Brevo contact integration skipped:', e.message);
}

// --- Weather API Endpoint ---
app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ success: false, message: 'City is required as a query parameter.' });
  }
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, message: 'Weather API key not configured.' });
  }
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Weather API error:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch weather data.' });
  }
});

app.get('/api/tech-news', async (req, res) => {
  try {
    const apiKey = process.env.GNEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, message: 'GNews API key not configured.' });
    }
    const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&apikey=${apiKey}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});