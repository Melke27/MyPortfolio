// Simple Chat Backend - Expanded Knowledge Base for Melkamu Wako
const express = require('express');
const cors = require('cors');
// const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// --- Jokes, Games, and Fun Data ---
const techJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Why was the JavaScript file so lonely? Because it didn't know how to 'join'!",
  "Why did the computer go to therapy? It had too many bytes from its past.",
  "Why do programmers hate nature? It has too many bugs.",
  "Why did the coder quit their job? Because they didn't get arrays (a raise).",
  "Why was the function sad? Because it didn't get called.",
  "Why do developers drink coffee? Because the code doesn't compile itself!",
  "Why did the code cross the road? To get to the other IDE.",
  "Why was the computer cold? It left its Windows open.",
  "Why did the bug go to the party? Because it was a byte night!",
  "Why do programmers prefer using the dark? Because the light attracts bugs!",
  "Why did the computer keep sneezing? It had a bad case of the 'viruses'.",
  "Why did the developer go broke? Because he used up all his cache.",
  "Why did the programmer get stuck in the shower? The instructions on the shampoo bottle said: Lather, Rinse, Repeat.",
  "Why do programmers prefer iOS development? Because on Android, they have too many Java exceptions!"
];

const riddles = [
  { question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", answer: "An echo." },
  { question: "What has keys but can't open locks?", answer: "A piano." },
  { question: "What can travel around the world while staying in a corner?", answer: "A stamp." },
  { question: "What gets wetter as it dries?", answer: "A towel." },
  { question: "What has a head, a tail, is brown, and has no legs?", answer: "A penny." }
];

const rockPaperScissors = ["rock", "paper", "scissors"];

// In-memory memory to avoid repeating the same joke/answer in a row
let lastJoke = null;
let lastRiddle = null;
let isFirstMessage = true;

// Hugging Face Inference API call
async function askHuggingFace(message) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/bigscience/bloom-560m',
      {
        inputs: message,
        parameters: { max_new_tokens: 100 }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        }
      }
    );
    if (Array.isArray(response.data) && response.data[0]?.generated_text) {
      return response.data[0].generated_text;
    } else if (response.data.generated_text) {
      return response.data.generated_text;
    } else {
      return JSON.stringify(response.data);
    }
  } catch (err) {
    console.error('Hugging Face API error:', err.response ? err.response.data : err.message);
    throw err;
  }
}

// --- Main Chatbot Logic ---
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  try {
    const reply = await askHuggingFace(message);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'AI request failed', details: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Simple chat backend running on port ${PORT}`);
}); 