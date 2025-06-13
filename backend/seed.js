const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost'); // Adjust path as needed
const dotenv = require('dotenv');

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected for seeding');

        // Clear existing blog posts
        await BlogPost.deleteMany({});
        console.log('Existing blog posts cleared');

        const dummyBlogPosts = [
            {
                title: 'My First Blog Post',
                slug: 'my-first-blog-post',
                author: 'Melkamu Wako',
                imageUrl: 'https://via.placeholder.com/600x400/8BC34A/FFFFFF?text=Blog+Post+1',
                description: 'This is a short description of my very first blog post.',
                content: '<h1>Welcome to my first blog post!</h1><p>This is the full content of the first blog post. It discusses the initial steps of setting up a blog and the excitement of sharing thoughts online.</p>',
                views: 120,
                commentsCount: 5,
                tags: ['web development', 'personal', 'tutorial'],
                category: 'Development'
            },
            {
                title: 'Understanding JavaScript Closures',
                slug: 'understanding-javascript-closures',
                author: 'Melkamu Wako',
                imageUrl: 'https://via.placeholder.com/600x400/8BC34A/FFFFFF?text=Blog+Post+2',
                description: 'A deep dive into how JavaScript closures work and their practical applications.',
                content: '<h1>JavaScript Closures Explained</h1><p>Closures are a fundamental concept in JavaScript. This post breaks down what they are, why they are useful, and provides code examples.</p>',
                views: 250,
                commentsCount: 12,
                tags: ['javascript', 'programming', 'frontend'],
                category: 'Programming'
            },
            {
                title: 'Getting Started with Node.js',
                slug: 'getting-started-with-nodejs',
                author: 'Melkamu Wako',
                imageUrl: 'https://via.placeholder.com/600x400/8BC34A/FFFFFF?text=Blog+Post+3',
                description: 'A beginner-friendly guide to setting up and running your first Node.js application.',
                content: '<h1>Node.js for Beginners</h1><p>This guide covers the basics of Node.js, including installation, setting up a simple server, and handling requests.</p>',
                views: 180,
                commentsCount: 8,
                tags: ['nodejs', 'backend', 'web development'],
                category: 'Development'
            },
            {
                title: 'The Importance of Responsive Web Design',
                slug: 'importance-of-responsive-web-design',
                author: 'Melkamu Wako',
                imageUrl: 'https://via.placeholder.com/600x400/8BC34A/FFFFFF?text=Blog+Post+4',
                description: 'Why responsive design is crucial for modern web development and how to implement it.',
                content: '<h1>Responsive Web Design</h1><p>Learn about the principles of responsive web design and techniques to make your websites look great on all devices.</p>',
                views: 300,
                commentsCount: 15,
                tags: ['web design', 'frontend', 'css'],
                category: 'Design'
            }
        ];

        await BlogPost.insertMany(dummyBlogPosts);
        console.log('Dummy blog posts inserted');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
};

seedDatabase(); 