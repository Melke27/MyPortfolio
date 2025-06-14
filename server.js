const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Blog posts data (in production, this would come from a database)
const blogPosts = [
    {
        id: 1,
        title: "Introduction to Competitive Programming",
        description: "Learn how to get started with competitive programming and improve your problem-solving skills.",
        date: "2025-06-01",
        imageUrl: "https://via.placeholder.com/400x250/8BC34A/ffffff?text=Competitive+Programming",
        slug: "competitive-programming-intro",
        views: 125,
        commentsCount: 8
    },
    {
        id: 2,
        title: "Building Modern Web Applications",
        description: "A comprehensive guide to building responsive web applications using modern technologies.",
        date: "2025-05-25",
        imageUrl: "https://via.placeholder.com/400x250/8BC34A/ffffff?text=Web+Development",
        slug: "modern-web-apps",
        views: 98,
        commentsCount: 5
    },
    {
        id: 3,
        title: "Cybersecurity Best Practices",
        description: "Essential cybersecurity practices for developers and system administrators.",
        date: "2025-05-18",
        imageUrl: "https://via.placeholder.com/400x250/8BC34A/ffffff?text=Cybersecurity",
        slug: "cybersecurity-practices",
        views: 75,
        commentsCount: 3
    }
];

// Blog posts API routes
app.get('/api/blogposts', (req, res) => {
    res.json(blogPosts);
});

app.get('/api/blogposts/:slug', (req, res) => {
    const post = blogPosts.find(p => p.slug === req.params.slug);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
