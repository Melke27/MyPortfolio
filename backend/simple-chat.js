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
    reply = 'Hello! I\'m Melkamu Wako\'s AI assistant. How can I help you today?';
  } else if (lowerMessage.includes('name') || lowerMessage.includes('who are you')) {
    reply = 'I\'m Melkamu Wako\'s AI assistant. I help visitors learn about Melkamu\'s skills, projects, and experience.';
  } else if (lowerMessage.includes('melkamu')) {
    reply = 'Melkamu Wako is a software developer and engineer. He has experience in web development, mobile apps, and various programming languages. You can ask me about his projects, skills, or background!';
  } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
    reply = 'Melkamu has worked on many projects including web applications, mobile apps, and software development. Some of his projects include e-commerce sites, weather apps, and educational tools. What specific type of project interests you?';
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
    reply = 'You can contact Melkamu through the contact form on this website, via LinkedIn, or email at melkamuwako5@gmail.com.';
  } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
    reply = 'Melkamu\'s skills include JavaScript, React, Python, Java, C++, C#, HTML/CSS, Node.js, and more. He\'s experienced in both frontend and backend development. What specific technology would you like to know about?';
  } else if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
    reply = 'Melkamu has experience in software development, web development, and mobile app development. He\'s worked on various projects and has a strong foundation in multiple programming languages and frameworks.';
  } else if (lowerMessage.includes('education') || lowerMessage.includes('degree')) {
    reply = 'Melkamu has a background in software engineering and computer science. He\'s passionate about technology and continuous learning.';
  } else {
    reply = 'Thanks for your message! I\'m Melkamu\'s AI assistant. You can ask me about his projects, skills, experience, education, or contact information.';
  }
  
  res.json({ reply });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Simple chat backend running on port ${PORT}`);
}); 