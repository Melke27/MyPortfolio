const mongoose = require('mongoose');
const dotenv = require('dotenv');
const BlogPost = require('./models/BlogPost');

dotenv.config();

const sampleBlogPosts = [
    {
        title: "Getting Started with React in 2025",
        slug: "getting-started-react-2025",
        description: "Learn how to build modern web applications with React, the most popular JavaScript library for building user interfaces.",
        content: `<h2>Introduction to React</h2>
<p>React continues to dominate the frontend landscape in 2025. With the introduction of new features like Server Components and improved hooks, building scalable applications has never been easier.</p>

<h3>Key Features</h3>
<ul>
<li>Component-based architecture</li>
<li>Virtual DOM for optimal performance</li>
<li>Rich ecosystem of libraries</li>
<li>Strong community support</li>
</ul>

<h3>Getting Started</h3>
<p>To create a new React project, you can use Vite which provides a fast development experience:</p>
<pre><code>npm create vite@latest my-react-app -- --template react</code></pre>

<p>Once created, install dependencies and start the development server:</p>
<pre><code>cd my-react-app
npm install
npm run dev</code></pre>

<h3>Building Your First Component</h3>
<p>React components are the building blocks of any React application. Here's a simple example:</p>
<pre><code>function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}</code></pre>

<h3>Conclusion</h3>
<p>React provides a powerful and flexible way to build modern web applications. With its component-based architecture and extensive ecosystem, it's an excellent choice for developers of all skill levels.</p>`,
        imageUrl: "assets/img/Discover the power of JSON in web development! Our….jpg",
        date: new Date("2025-02-20"),
        author: {
            name: "Melkamu Wako",
            imageUrl: "assets/img/MELKAMU.jpg",
            bio: "Computer Science student and passionate fullstack developer"
        },
        tags: ["React", "JavaScript", "Web Development"],
        views: 150,
        commentsCount: 5
    },
    {
        title: "Understanding Node.js and Express Backend Development",
        slug: "nodejs-express-backend",
        description: "A comprehensive guide to building robust backend applications using Node.js and Express framework.",
        content: `<h2>Why Node.js?</h2>
<p>Node.js has revolutionized backend development by allowing developers to use JavaScript on the server side. Its event-driven, non-blocking I/O model makes it perfect for real-time applications.</p>

<h3>Setting Up Express</h3>
<p>Express.js is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.</p>
<pre><code>const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});</code></pre>

<h3>RESTful API Design</h3>
<p>When building APIs, follow REST principles:</p>
<ul>
<li>Use HTTP methods appropriately (GET, POST, PUT, DELETE)</li>
<li>Use proper status codes</li>
<li>Keep URLs clean and RESTful</li>
<li>Implement proper error handling</li>
</ul>

<h3>Middleware</h3>
<p>Middleware functions are essential in Express. They can:</p>
<ul>
<li>Execute any code</li>
<li>Make changes to the request/response objects</li>
<li>End the request-response cycle</li>
<li>Call the next middleware function</li>
</ul>

<h3>Conclusion</h3>
<p>Node.js and Express provide a powerful combination for building scalable backend applications. Their popularity continues to grow in 2025.</p>`,
        imageUrl: "assets/img/cloud.jpg",
        date: new Date("2025-02-18"),
        author: {
            name: "Melkamu Wako",
            imageUrl: "assets/img/MELKAMU.jpg",
            bio: "Computer Science student and passionate fullstack developer"
        },
        tags: ["Node.js", "Express", "Backend", "API"],
        views: 120,
        commentsCount: 3
    },
    {
        title: "Mastering MongoDB: From Basics to Advanced",
        slug: "mastering-mongodb",
        description: "Everything you need to know about MongoDB, the most popular NoSQL database for modern applications.",
        content: `<h2>What is MongoDB?</h2>
<p>MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents. This makes it ideal for rapid development and scaling.</p>

<h3>Key Concepts</h3>
<ul>
<li><strong>Documents</strong>: The basic unit of data in MongoDB</li>
<li><strong>Collections</strong>: Groups of documents</li>
<li><strong>Database</strong>: Containers for collections</li>
</ul>

<h3>Connecting to MongoDB</h3>
<pre><code>const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));</code></pre>

<h3>Defining Schemas</h3>
<pre><code>const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

const User = model('User', userSchema);</code></pre>

<h3>CRUD Operations</h3>
<p>MongoDB provides powerful query operations:</p>
<ul>
<li>Create: insertOne(), insertMany()</li>
<li>Read: find(), findOne(), findById()</li>
<li>Update: updateOne(), updateMany(), findByIdAndUpdate()</li>
<li>Delete: deleteOne(), deleteMany(), findByIdAndDelete()</li>
</ul>

<h3>Conclusion</h3>
<p>MongoDB's flexibility and scalability make it an excellent choice for modern applications. Its document model maps well to object-oriented programming languages.</p>`,
        imageUrl: "assets/img/cyper.jpg",
        date: new Date("2025-02-15"),
        author: {
            name: "Melkamu Wako",
            imageUrl: "assets/img/MELKAMU.jpg",
            bio: "Computer Science student and passionate fullstack developer"
        },
        tags: ["MongoDB", "Database", "NoSQL"],
        views: 95,
        commentsCount: 2
    },
    {
        title: "The Future of Web Development: Trends to Watch in 2025",
        slug: "web-development-trends-2025",
        description: "Explore the latest trends shaping the future of web development, from AI integration to edge computing.",
        content: `<h2>Web Development in 2025</h2>
<p>The web development landscape continues to evolve rapidly. Here are the key trends that are shaping the industry in 2025.</p>

<h3>1. AI-Powered Development</h3>
<p>AI tools are becoming integral to the development workflow:</p>
<ul>
<li>Code generation and completion</li>
<li>Automated testing</li>
<li>Performance optimization</li>
<li>Security vulnerability detection</li>
</ul>

<h3>2. Edge Computing</h3>
<p>Edge computing brings computation closer to users:</p>
<ul>
<li>Faster response times</li>
<li>Reduced latency</li>
<li>Better user experience</li>
<li>Lower bandwidth costs</li>
</ul>

<h3>3. WebAssembly (Wasm)</h3>
<p>WebAssembly enables high-performance applications in browsers:</p>
<ul>
<li>Near-native performance</li>
<li>Support for multiple languages</li>
<li>Gaming and multimedia applications</li>
<li>Serverless functions</li>
</ul>

<h3>4. Progressive Web Apps (PWAs)</h3>
<p>PWAs continue to blur the line between web and native apps:</p>
<ul>
<li>Offline functionality</li>
<li>Push notifications</li>
<li>Home screen installation</li>
<li>Cross-platform compatibility</li>
</ul>

<h3>5. Serverless Architecture</h3>
<p>Serverless computing is becoming the norm:</p>
<ul>
<li>Reduced infrastructure management</li>
<li>Automatic scaling</li>
<li>Pay-per-use pricing</li>
<li>Faster time to market</li>
</ul>

<h3>Conclusion</h3>
<p>Staying updated with these trends is crucial for developers who want to remain competitive in the ever-evolving web development field.</p>`,
        imageUrl: "assets/img/AI.jpg",
        date: new Date("2025-02-10"),
        author: {
            name: "Melkamu Wako",
            imageUrl: "assets/img/MELKAMU.jpg",
            bio: "Computer Science student and passionate fullstack developer"
        },
        tags: ["Web Development", "Trends", "AI", "Future"],
        views: 200,
        commentsCount: 8
    },
    {
        title: "Building a Portfolio Website That Stands Out",
        slug: "portfolio-website-guide",
        description: "Tips and best practices for creating an impressive developer portfolio that showcases your skills.",
        content: `<h2>Why a Portfolio Matters</h2>
<p>Your portfolio is often the first impression potential employers or clients have of you. A well-crafted portfolio can be the key to landing your dream job or project.</p>

<h3>Essential Elements</h3>
<ul>
<li><strong>Clean Design</strong>: First impressions matter</li>
<li><strong>Project Showcase</strong>: Display your best work</li>
<li><strong>About Section</strong>: Tell your story</li>
<li><strong>Contact Information</strong>: Make it easy to reach you</li>
<li><strong>Skills & Technologies</strong>: Show your expertise</li>
</ul>

<h3>Project Presentation Tips</h3>
<p>When showcasing projects, include:</p>
<ul>
<li>Clear project description</li>
<li>Technologies used</li>
<li>Links to live demo and source code</li>
<li>Challenges faced and solutions</li>
<li>Screenshots or videos</li>
</ul>

<h3>Making It Interactive</h3>
<p>Add interactive elements to engage visitors:</p>
<ul>
<li>Contact form with validation</li>
<li>Blog section for thought leadership</li>
<li>Chatbot for instant communication</li>
<li>Project filtering and sorting</li>
</ul>

<h3>Mobile Responsiveness</h3>
<p>Ensure your portfolio looks great on all devices. Use responsive design principles and test on multiple screen sizes.</p>

<h3>Conclusion</h3>
<p>A great portfolio is an ongoing project. Keep updating it with new projects, skills, and achievements to continuously improve your professional image.</p>`,
        imageUrl: "assets/img/portfolio-1.jpg",
        date: new Date("2025-02-05"),
        author: {
            name: "Melkamu Wako",
            imageUrl: "assets/img/MELKAMU.jpg",
            bio: "Computer Science student and passionate fullstack developer"
        },
        tags: ["Portfolio", "Career", "Web Development"],
        views: 180,
        commentsCount: 6
    },
    {
        title: "Introduction to Cybersecurity Fundamentals",
        slug: "cybersecurity-fundamentals",
        description: "Learn the basics of cybersecurity and how to protect your applications from common threats.",
        content: `<h2>Why Cybersecurity Matters</h2>
<p>In an increasingly connected world, cybersecurity is more important than ever. Understanding the fundamentals is essential for every developer.</p>

<h3>Common Threats</h3>
<ul>
<li><strong>SQL Injection</strong>: Attackers manipulate database queries</li>
<li><strong>XSS (Cross-Site Scripting)</strong>: Injecting malicious scripts</li>
<li><strong>CSRF</strong>: Cross-Site Request Forgery</li>
<li><strong>Password Attacks</strong>: Brute force and dictionary attacks</li>
<li><strong>Man-in-the-Middle</strong>: Intercepting communications</li>
</ul>

<h3>Security Best Practices</h3>
<ul>
<li>Validate and sanitize all user input</li>
<li>Use parameterized queries</li>
<li>Implement proper authentication</li>
<li>Hash passwords with strong algorithms</li>
<li>Use HTTPS everywhere</li>
<li>Keep dependencies updated</li>
</ul>

<h3>Secure Development Lifecycle</h3>
<p>Incorporate security at every stage:</p>
<ol>
<li>Requirements analysis - Identify security needs</li>
<li>Design - Threat modeling</li>
<li>Implementation - Secure coding practices</li>
<li>Testing - Security testing</li>
<li>Maintenance - Regular updates and monitoring</li>
</ol>

<h3>Conclusion</h3>
<p>Security is not an afterthought - it should be built into your applications from the ground up. Stay vigilant and keep learning about new threats and defenses.</p>`,
        imageUrl: "assets/img/cyper.jpg",
        date: new Date("2025-01-28"),
        author: {
            name: "Melkamu Wako",
            imageUrl: "assets/img/MELKAMU.jpg",
            bio: "Computer Science student and passionate fullstack developer"
        },
        tags: ["Cybersecurity", "Security", "Web Development"],
        views: 145,
        commentsCount: 4
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri || mongoUri.includes('your_password')) {
            console.error('Please set your MONGODB_URI in backend/.env');
            console.log('Get a free MongoDB cluster at: https://www.mongodb.com/cloud/atlas');
            process.exit(1);
        }

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB...');

        // Clear existing blog posts
        await BlogPost.deleteMany({});
        console.log('Cleared existing blog posts');

        // Insert new blog posts
        await BlogPost.insertMany(sampleBlogPosts);
        console.log(`Successfully seeded ${sampleBlogPosts.length} blog posts!`);

        // Display seeded posts
        const posts = await BlogPost.find().sort({ date: -1 });
        console.log('\nSeeded Blog Posts:');
        posts.forEach((post, index) => {
            console.log(`${index + 1}. ${post.title} (${post.slug})`);
        });

        console.log('\nDatabase seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
