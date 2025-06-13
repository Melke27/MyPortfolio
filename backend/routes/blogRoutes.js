const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Get all blog posts
router.get('/blogposts', async (req, res) => {
    try {
        const posts = await BlogPost.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ message: 'Error fetching blog posts' });
    }
});

// Get a single blog post by slug
router.get('/blogposts/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ message: 'Error fetching blog post' });
    }
});

module.exports = router; 