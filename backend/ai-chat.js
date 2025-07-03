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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected for chatbot')).catch(console.error);

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required.' });
  try {
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
    // 3. Fallback to OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      max_tokens: 200
    });
    const aiReply = completion.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (err) {
    console.error('AI/database request failed:', err);
    res.status(500).json({ error: 'AI/database request failed', details: err.message, stack: err.stack });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`AI Chat backend running on port ${PORT}`);
}); 