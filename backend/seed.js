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

        const blogPosts = [
            {
                title: "Understanding JavaScript Closures",
                slug: "understanding-javascript-closures",
                description: "A comprehensive guide to understanding JavaScript closures, their practical applications, and common use cases.",
                content: `
                    <h2>What are JavaScript Closures?</h2>
                    <p>A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created.</p>
                    
                    <h2>Why are Closures Important?</h2>
                    <p>Closures are fundamental to JavaScript and are used in many common programming patterns. They allow for data privacy and function factories, among other things.</p>
                    
                    <h2>Practical Example</h2>
                    <pre><code>
    function createCounter() {
        let count = 0;
        return {
            increment: function() {
                count++;
                return count;
            },
            decrement: function() {
                count--;
                return count;
            },
            getCount: function() {
                return count;
            }
        };
    }

    const counter = createCounter();
    console.log(counter.increment()); // 1
    console.log(counter.increment()); // 2
    console.log(counter.decrement()); // 1
                    </code></pre>
                    
                    <h2>Common Use Cases</h2>
                    <ul>
                        <li>Data Privacy</li>
                        <li>Function Factories</li>
                        <li>Event Handlers</li>
                        <li>Currying</li>
                    </ul>
                `,
                imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                date: new Date("2024-03-15"),
                author: {
                    name: "Melkamu Wako",
                    imageUrl: "assets/img/MELKAMU.jpg",
                    bio: "Full-stack developer and technical writer passionate about JavaScript and web development."
                },
                tags: ["JavaScript", "Closures", "Web Development", "Programming"],
                views: 1250,
                commentsCount: 8
            },
            {
                title: "Mastering React Hooks",
                slug: "mastering-react-hooks",
                description: "Learn how to effectively use React Hooks to manage state and side effects in your applications.",
                content: `
                    <h2>Introduction to React Hooks</h2>
                    <p>React Hooks are functions that let you "hook into" React state and lifecycle features from function components.</p>
                    
                    <h2>Common Hooks</h2>
                    <ul>
                        <li>useState</li>
                        <li>useEffect</li>
                        <li>useContext</li>
                        <li>useReducer</li>
                    </ul>
                    
                    <h2>Best Practices</h2>
                    <p>Learn the best practices for using hooks in your React applications.</p>
                `,
                imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                date: new Date("2024-03-10"),
                author: {
                    name: "Melkamu Wako",
                    imageUrl: "assets/img/MELKAMU.jpg",
                    bio: "Full-stack developer and technical writer passionate about JavaScript and web development."
                },
                tags: ["React", "JavaScript", "Web Development"],
                views: 980,
                commentsCount: 5
            },
            {
                title: "Building RESTful APIs with Node.js",
                slug: "building-restful-apis",
                description: "A comprehensive guide to building scalable and maintainable RESTful APIs using Node.js and Express.",
                content: `
                    <h2>What is a RESTful API?</h2>
                    <p>REST (Representational State Transfer) is an architectural style for designing networked applications.</p>
                    
                    <h2>Key Principles</h2>
                    <ul>
                        <li>Client-Server Architecture</li>
                        <li>Stateless</li>
                        <li>Cacheable</li>
                        <li>Uniform Interface</li>
                    </ul>
                    
                    <h2>Implementation with Node.js</h2>
                    <p>Learn how to implement RESTful APIs using Node.js and Express.</p>
                `,
                imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                date: new Date("2024-03-05"),
                author: {
                    name: "Melkamu Wako",
                    imageUrl: "assets/img/MELKAMU.jpg",
                    bio: "Full-stack developer and technical writer passionate about JavaScript and web development."
                },
                tags: ["Node.js", "API", "Backend", "JavaScript"],
                views: 750,
                commentsCount: 3
            }
        ];

        await BlogPost.insertMany(blogPosts);
        console.log('Dummy blog posts inserted');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
};

seedDatabase(); 