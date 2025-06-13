const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single blog post by slug
router.get('/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        post.views += 1; // Increment views
        await post.save();
        res.json(post);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router; 