// Simple Chat Backend - No OpenAI or MongoDB required
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Simple chat backend is running',
    timestamp: new Date().toISOString()
  });
});

// Simple chat endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  
  console.log('Received message:', message);
  
  // Simple responses based on keywords
  let reply = '';
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    reply = 'Hello! How can I help you today?';
  } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
    reply = 'I can help you find information about my projects. Try asking about specific technologies like React, Python, or JavaScript.';
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
    reply = 'You can contact me through the contact form on this website or via LinkedIn.';
  } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
    reply = 'My skills include JavaScript, React, Python, Java, C++, C#, HTML/CSS, and more. What would you like to know about?';
  } else if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
    reply = 'I have experience in software development, web development, and various programming languages. Check out my projects section for more details.';
  } else {
    reply = 'Thanks for your message! I\'m a simple AI assistant. You can ask me about projects, skills, experience, or contact information.';
  }
  
  res.json({ reply });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Simple chat backend running on port ${PORT}`);
}); 