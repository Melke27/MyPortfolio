const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// Get all blog posts (public)
router.get('/blogposts', async (req, res) => {
    try {
        const posts = await BlogPost.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ message: 'Error fetching blog posts' });
    }
});

// Get latest blog posts (public) - for homepage
router.get('/blogposts/latest', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const posts = await BlogPost.find().sort({ date: -1 }).limit(limit);
        res.json(posts);
    } catch (error) {
        console.error('Error fetching latest blog posts:', error);
        res.status(500).json({ message: 'Error fetching latest blog posts' });
    }
});

// Get a single blog post by slug (public)
router.get('/blogposts/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        
        // Increment views
        post.views += 1;
        await post.save();
        
        res.json(post);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ message: 'Error fetching blog post' });
    }
});

// Create a new blog post (protected - would need authentication middleware)
router.post('/blogposts', async (req, res) => {
    try {
        const { title, slug, description, content, imageUrl, date, author, tags } = req.body;

        // Check if slug already exists
        const existingPost = await BlogPost.findOne({ slug });
        if (existingPost) {
            return res.status(400).json({ message: 'A post with this slug already exists' });
        }

        const newPost = new BlogPost({
            title,
            slug,
            description,
            content,
            imageUrl,
            date: date || new Date(),
            author: author || {
                name: "Melkamu Wako",
                imageUrl: "assets/img/MELKAMU.jpg",
                bio: "Computer Science student and passionate fullstack developer"
            },
            tags: tags || [],
            views: 0,
            commentsCount: 0
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ message: 'Error creating blog post' });
    }
});

// Update a blog post (protected)
router.put('/blogposts/:id', async (req, res) => {
    try {
        const { title, slug, description, content, imageUrl, date, author, tags } = req.body;
        
        const updatedPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            {
                title,
                slug,
                description,
                content,
                imageUrl,
                date,
                author,
                tags
            },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.json(updatedPost);
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ message: 'Error updating blog post' });
    }
});

// Delete a blog post (protected)
router.delete('/blogposts/:id', async (req, res) => {
    try {
        const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
        
        if (!deletedPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ message: 'Error deleting blog post' });
    }
});

// Get blog post count (public)
router.get('/blogposts/count/all', async (req, res) => {
    try {
        const count = await BlogPost.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error counting blog posts:', error);
        res.status(500).json({ message: 'Error counting blog posts' });
    }
});

// Bulk create blog posts (for seeding)
router.post('/blogposts/bulk', async (req, res) => {
    try {
        const posts = req.body;
        const defaultAuthor = {
            name: "Melkamu Wako",
            imageUrl: "assets/img/MELKAMU.jpg",
            bio: "Computer Science student and passionate fullstack developer"
        };
        
        const postsWithDefaults = posts.map(post => ({
            ...post,
            author: post.author || defaultAuthor,
            views: post.views || 0,
            commentsCount: post.commentsCount || 0
        }));
        
        const savedPosts = await BlogPost.insertMany(postsWithDefaults);
        res.status(201).json(savedPosts);
    } catch (error) {
        console.error('Error bulk creating blog posts:', error);
        res.status(500).json({ message: 'Error bulk creating blog posts' });
    }
});

module.exports = router;
