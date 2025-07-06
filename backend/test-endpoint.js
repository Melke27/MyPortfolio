// Simple test endpoint to debug backend issues
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Backend is running!',
    env_vars: {
      has_openai_key: !!process.env.OPENAI_API_KEY,
      has_mongodb_uri: !!process.env.MONGODB_URI,
      port: process.env.PORT || 5001
    }
  });
});

// Simple chat endpoint without database/OpenAI
app.post('/simple-chat', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  
  res.json({ 
    reply: `You said: "${message}". This is a test response from the backend.`,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Test backend running on port ${PORT}`);
}); 