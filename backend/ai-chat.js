// AI Chat Backend Server
// ----------------------
// 1. Install dependencies: npm install express cors dotenv openai mongoose
// 2. Create a .env file with: OPENAI_API_KEY=your_openai_api_key_here, MONGODB_URI=your_mongodb_uri
// 3. Run: node ai-chat.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const Project = require('./models/Project');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    env_vars: {
      has_openai_key: !!process.env.OPENAI_API_KEY,
      has_mongodb_uri: !!process.env.MONGODB_URI,
      mongodb_connected: mongoose.connection.readyState === 1
    }
  });
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected for chatbot')).catch(console.error);

// In-memory chat history (shared for all users, resets on server restart)
const chatHistory = [];
const MAX_HISTORY = 20; // Store last 20 messages

// Helper: Check for repeated questions
function isRepeatedQuestion(message) {
  return chatHistory.some(entry => entry.message.toLowerCase() === message.toLowerCase());
}

// Helper: Get a different response for repeated questions
function getDifferentResponse(topic) {
  const responses = {
    games: [
      "Here are some fun games you might like: Chess, Sudoku, or try coding a simple game yourself!",
      "Gaming is a great way to relax. Do you want recommendations for online games or programming game ideas?",
      "Games can boost your problem-solving skills! Ever tried making your own game?"
    ],
    programming: [
      "Programming opens up endless possibilities! What language or topic interests you?",
      "Want to learn about algorithms, data structures, or web development? Ask me anything!",
      "Programming is both art and science. Do you have a specific question or need a project idea?"
    ],
    joke: [
      "Why do Java developers wear glasses? Because they don't see sharp!",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
      "Why do Python programmers have low self-esteem? Because they're constantly comparing their self to others."
    ]
  };
  if (responses[topic]) {
    // Pick a random response
    return responses[topic][Math.floor(Math.random() * responses[topic].length)];
  }
  return null;
}

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required.' });
  
  // Check for repeated question
  if (isRepeatedQuestion(message)) {
    // Try to give a different response for known topics
    if (/game/i.test(message)) {
      return res.json({ reply: getDifferentResponse('games') });
    }
    if (/joke/i.test(message)) {
      return res.json({ reply: getDifferentResponse('joke') });
    }
    if (/programming|algorithm|code|developer/i.test(message)) {
      return res.json({ reply: getDifferentResponse('programming') });
    }
    // Otherwise, let OpenAI try to answer differently
  }

  // Add to chat history
  chatHistory.push({ message });
  if (chatHistory.length > MAX_HISTORY) chatHistory.shift();

  console.log('Received chat request:', message);
  
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, skipping database search');
    } else {
      // 1. Search BlogPosts
      const blog = await BlogPost.findOne({
        $or: [
          { title: { $regex: message, $options: 'i' } },
          { description: { $regex: message, $options: 'i' } },
          { tags: { $elemMatch: { $regex: message, $options: 'i' } } }
        ]
      });
      if (blog) {
        return res.json({ reply: `Here's a relevant blog post: "${blog.title}"\n${blog.description}\nRead more on the blog!` });
      }
      // 2. Search Projects
      const project = await Project.findOne({
        $or: [
          { title: { $regex: message, $options: 'i' } },
          { description: { $regex: message, $options: 'i' } },
          { technologies: { $elemMatch: { $regex: message, $options: 'i' } } }
        ]
      });
      if (project) {
        return res.json({ reply: `Here's a relevant project: "${project.title}"\n${project.description}\nTech: ${project.technologies.join(', ')}` });
      }
    }
    
    // 3. Fallback to OpenAI
    if (!process.env.OPENAI_API_KEY) {
      console.log('No OpenAI API key found');
      return res.json({ reply: 'Sorry, I cannot process your request right now. Please try again later.' });
    }
    
    // For certain keywords, provide dynamic responses before OpenAI
    if (/game/i.test(message)) {
      return res.json({ reply: getDifferentResponse('games') });
    }
    if (/joke/i.test(message)) {
      return res.json({ reply: getDifferentResponse('joke') });
    }
    if (/programming|algorithm|code|developer/i.test(message)) {
      return res.json({ reply: getDifferentResponse('programming') });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      max_tokens: 200
    });
    const aiReply = completion.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (err) {
    console.error('AI/database request failed:', err);
    res.status(500).json({ 
      error: 'AI/database request failed', 
      details: err.message, 
      stack: err.stack,
      env_check: {
        has_openai_key: !!process.env.OPENAI_API_KEY,
        has_mongodb_uri: !!process.env.MONGODB_URI,
        mongodb_connected: mongoose.connection.readyState === 1
      }
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`AI Chat backend running on port ${PORT}`);
}); 