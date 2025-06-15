const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js');

const app = express();
const PORT = process.env.PORT || 10000;

// MongoDB connection
const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://melkamuwako27:melkamuwako27@cluster0.8jzqz.mongodb.net/myportfolio?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB successfully');
    console.log('Attempting to seed database...');
    
    // Seed sample blog posts if database is empty
    BlogPost.countDocuments({}, (err, count) => {
        if (err) {
            console.error('Error checking blog posts:', err);
            return;
        }
        console.log(`Found ${count} blog posts in database`);
        
        if (count === 0) {
            console.log('No blog posts found, seeding database...');
            const samplePosts = [
                {
                    title: "Mastering React: Building Modern Web Applications",
                    slug: "mastering-react-building-modern-web-applications",
                    content: "In this comprehensive guide, we'll explore the fundamentals of React and how to build modern, scalable web applications. From setting up your development environment to implementing advanced features like state management and routing, this article covers everything you need to know to become a proficient React developer.",
                    date: new Date('2025-06-15'),
                    author: "Melkamu Wako",
                    description: "A comprehensive guide to React development",
                    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                    tags: ["React", "JavaScript", "Web Development", "Frontend"]
                },
                {
                    title: "Node.js Best Practices: Building Scalable Backend Services",
                    slug: "nodejs-best-practices-building-scalable-backend-services",
                    content: "Learn how to build scalable and maintainable backend services using Node.js. This article covers essential topics such as error handling, database integration, security best practices, and performance optimization techniques.",
                    date: new Date('2025-06-14'),
                    author: "Melkamu Wako",
                    description: "Building scalable Node.js applications",
                    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                    tags: ["Node.js", "Backend", "Performance", "Scalability"]
                },
                {
                    title: "Introduction to Competitive Programming",
                    slug: "introduction-to-competitive-programming",
                    content: "Get started with competitive programming and learn how to solve algorithmic challenges efficiently. This article covers essential data structures, algorithms, and problem-solving techniques that will help you excel in programming contests.",
                    date: new Date('2025-06-13'),
                    author: "Melkamu Wako",
                    description: "Beginner's guide to competitive programming",
                    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                    tags: ["Competitive Programming", "Algorithms", "Data Structures", "Problem Solving"]
                }
            ];
            
            BlogPost.insertMany(samplePosts)
                .then(() => {
                    console.log('Sample blog posts seeded successfully');
                    console.log('Checking seeded posts...');
                    BlogPost.find().then(posts => {
                        console.log(`Total posts after seeding: ${posts.length}`);
                        console.log('First post:', posts[0]);
                    });
                })
                .catch(err => console.error('Error seeding blog posts:', err));
        } else {
            console.log('Database already has blog posts');
            BlogPost.find().then(posts => {
                console.log(`Total posts found: ${posts.length}`);
                console.log('First post:', posts[0]);
            });
        }
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Error details:', err.stack);
});

// API Routes
app.get('/api/blogposts', async (req, res) => {
    try {
        const posts = await BlogPost.find().sort({ date: -1 }).limit(3);
        res.json(posts);
        console.error('Error loading blog post:', error);
        res.status(500).send('Error loading blog post');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
