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
        commentsCount: 8,
        content: `
            <h2>What is Competitive Programming?</h2>
            <p>Competitive programming is a mind sport where participants solve algorithmic problems within a time limit. It's an excellent way to improve your problem-solving skills and learn efficient algorithms.</p>
            
            <h2>Getting Started</h2>
            <p>Start with platforms like Codeforces, LeetCode, and HackerRank. Focus on understanding basic algorithms and data structures first.</p>
            
            <h2>Key Skills to Develop</h2>
            <ul>
                <li>Algorithm analysis and complexity</li>
                <li>Data structures (arrays, linked lists, trees, graphs)</li>
                <li>Dynamic programming</li>
                <li>Graph algorithms</li>
                <li>Mathematical thinking</li>
            </ul>
        `,
        author: {
            name: "Melkamu Wako",
            imageUrl: "assets/img/MELKAMU.jpg",
            bio: "Computer Science student and competitive programming enthusiast"
        },
        tags: ["Competitive Programming", "Algorithms", "Problem Solving"]
    },
    {
        id: 2,
        title: "Building Modern Web Applications",
        description: "A comprehensive guide to building responsive web applications using modern technologies.",
        date: "2025-05-25",
        imageUrl: "https://via.placeholder.com/400x250/8BC34A/ffffff?text=Web+Development",
        slug: "modern-web-apps",
        views: 98,
        commentsCount: 5,
        content: `
            <h2>Modern Web Development Stack</h2>
            <p>Today's web applications require a robust tech stack that includes frontend frameworks, backend services, and modern deployment practices.</p>
            
            <h2>Frontend Technologies</h2>
            <ul>
                <li>React.js for dynamic user interfaces</li>
                <li>CSS3 and Flexbox/Grid for responsive design</li>
                <li>JavaScript ES6+ for modern syntax</li>
                <li>Webpack for bundling</li>
            </ul>
            
            <h2>Backend Considerations</h2>
            <p>Choose the right backend technology based on your project requirements. Node.js, Python, and Java are all excellent choices.</p>
        `,
        author: {
            name: "Melkamu Wako",
            imageUrl: "assets/img/MELKAMU.jpg",
            bio: "Full-stack developer passionate about modern web technologies"
        },
        tags: ["Web Development", "React", "JavaScript", "Full-Stack"]
    },
    {
        id: 3,
        title: "Cybersecurity Best Practices",
        description: "Essential cybersecurity practices for developers and system administrators.",
        date: "2025-05-18",
        imageUrl: "https://via.placeholder.com/400x250/8BC34A/ffffff?text=Cybersecurity",
        slug: "cybersecurity-practices",
        views: 75,
        commentsCount: 3,
        content: `
            <h2>Why Cybersecurity Matters</h2>
            <p>In today's digital world, cybersecurity is not optional. Every developer should understand basic security principles to protect their applications and users.</p>
            
            <h2>Essential Security Practices</h2>
            <ul>
                <li>Input validation and sanitization</li>
                <li>Secure authentication and authorization</li>
                <li>HTTPS everywhere</li>
                <li>Regular security updates</li>
                <li>Data encryption</li>
            </ul>
            
            <h2>Common Vulnerabilities to Avoid</h2>
            <p>Learn about SQL injection, XSS attacks, CSRF, and other common security vulnerabilities.</p>
        `,
        author: {
            name: "Melkamu Wako",
            imageUrl: "assets/img/MELKAMU.jpg",
            bio: "Cybersecurity enthusiast and developer"
        },
        tags: ["Cybersecurity", "Security", "Best Practices"]
    },
    {
        id: 4,
        title: "AI in Everyday Life: New Innovations",
        description: "Discover how artificial intelligence is transforming daily experiences, from smart assistants to healthcare.",
        date: "2025-06-10",
        imageUrl: "https://via.placeholder.com/400x250/8BC34A/ffffff?text=AI+Innovation",
        slug: "ai-everyday-life",
        views: 50,
        commentsCount: 0,
        content: `
            <h2>The AI Revolution</h2>
            <p>Artificial Intelligence is no longer science fiction. It's here, and it's transforming how we live, work, and interact with technology.</p>
            
            <h2>AI Applications in Daily Life</h2>
            <ul>
                <li>Smart assistants (Siri, Alexa, Google Assistant)</li>
                <li>Recommendation systems (Netflix, Spotify)</li>
                <li>Autonomous vehicles</li>
                <li>Healthcare diagnostics</li>
                <li>Financial fraud detection</li>
            </ul>
            
            <h2>The Future of AI</h2>
            <p>As AI continues to evolve, we can expect even more innovative applications that will make our lives easier and more efficient.</p>
        `,
        author: {
            name: "Melkamu Wako",
            imageUrl: "assets/img/MELKAMU.jpg",
            bio: "AI enthusiast and technology researcher"
        },
        tags: ["Artificial Intelligence", "Innovation", "Technology"]
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
