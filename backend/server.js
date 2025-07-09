const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS with specific options
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
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
        // Retry connection after 5 seconds
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

// Import blog routes
const blogRoutes = require('./routes/blogRoutes');

// Email configuration
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Routes
app.use('/api', blogRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date() });
});

app.post('/api/contact', async (req, res) => {
    try {
        console.log('Received contact form submission:', req.body);
        const { name, email, subject, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
        }
        // Save to database
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        console.log('Contact form saved successfully');
        // Send email notification using Brevo HTTP API
            try {
            const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
            await apiInstance.sendTransacEmail({
                sender: { email: 'melkamuwako5@gmail.com', name: 'Portfolio Contact' },
                to: [{ email: 'melkamuwako5@gmail.com', name: 'Melkamu Wako' }],
                    subject: `New Contact Form Submission from ${name}`,
                htmlContent: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                    `
                });
            console.log('Email notification sent via Brevo HTTP API');
            } catch (emailError) {
            console.error('Error sending email via Brevo HTTP API:', emailError);
            return res.status(500).json({ success: false, message: 'Failed to send email notification.' });
        }
        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error in /api/contact endpoint:', error);
        res.status(500).json({ success: false, message: 'Internal server error: Failed to process message.' });
    }
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
        if (defaultClient) {
            try {
                const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
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
async function askOpenRouter(message) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          {
            role: 'system',
            content: `You are Melkamu Wako's AI assistant. You can answer general questions, provide technical help, and chat about a wide range of topics. If someone asks about Melkamu Wako, you know he is a Computer Science and Engineering student and fullstack developer from Ethiopia, with experience in JavaScript, React, Python, Java, C++, C#, HTML/CSS, and projects like a weather app, e-commerce site, and grade management system. For all other questions, answer as a helpful AI assistant.\nAt the end of every reply, add: 'Created by Melkamu Wako, Fullstack Developer. Contact: melkamuwako5@gmail.com'.`
          },
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
    console.error('OpenRouter API error:', err.response ? err.response.data : err.message);
    throw err;
  }
}

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
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
    res.status(500).json({ error: 'AI request failed', details: error.message });
  }
});

// --- Visitor Notification Endpoint (Telegram Bot) ---
const fetch = require('node-fetch');

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
  sendTelegramNotification('👀 Someone visited your portfolio!')
    .then(() => res.json({ success: true }))
    .catch(err => {
      console.error('Telegram error:', err.response ? err.response.data : err);
      res.status(500).json({ success: false });
    });
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
    console.log('Brevo API key configured:', !!apiKey.apiKey);
});