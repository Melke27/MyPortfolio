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
            },
            {
                title: "The Revolution of AI-Powered Development: Beyond Code Generation",
                slug: "ai-powered-development",
                description: "Explore how AI is transforming software development, from intelligent code assistants to automated testing and deployment.",
                content: `
                    <h2>AI in Software Development</h2>
                    <p>Artificial Intelligence is rapidly changing the landscape of software development. It's moving beyond simple code generation to more complex tasks like intelligent debugging, automated refactoring, and even predictive analytics for project management.</p>
                    
                    <h3>Key Areas of Impact:</h3>
                    <ul>
                        <li><b>Intelligent Code Assistants:</b> Tools like GitHub Copilot and Tabnine are helping developers write code faster and more accurately.</li>
                        <li><b>Automated Testing:</b> AI can generate test cases, identify bugs, and even suggest fixes, significantly reducing manual testing efforts.</li>
                        <li><b>Predictive Analytics:</b> AI models can analyze project data to predict potential delays, resource needs, and even security vulnerabilities.</li>
                        <li><b>Low-Code/No-Code Platforms:</b> AI is making it easier for non-developers to build applications, abstracting away complex coding.</li>
                    </ul>
                    
                    <p>Embracing AI in development workflows can lead to increased productivity, higher code quality, and faster time-to-market. It's not about replacing developers, but empowering them with more advanced tools.</p>
                `,
                imageUrl: "https://images.unsplash.com/photo-1698774026330-80a22a36b53a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDR8MHwxfHNlYXJjaHwxNXx8QUklMjBkZXZlbG9wbWVudHxlbnwwfHx8fHwxNzIwNTcwNjk0fDA&ixlib=rb-4.0.3&q=80&w=1080",
                date: new Date("2024-07-01"),
                author: {
                    name: "Melkamu Wako",
                    imageUrl: "assets/img/MELKAMU.jpg",
                    bio: "Full-stack developer and technical writer passionate about AI and future technologies."
                },
                tags: ["AI", "Software Development", "Future Tech", "Automation"],
                views: 1500,
                commentsCount: 12
            },
            {
                title: "Demystifying Quantum Computing: A Developer's Introduction",
                slug: "demystifying-quantum-computing",
                description: "A beginner-friendly guide to the concepts of quantum computing and its potential impact on software development.",
                content: `
                    <h2>What is Quantum Computing?</h2>
                    <p>Quantum computing utilizes the principles of quantum mechanics (superposition, entanglement, and interference) to perform computations. Unlike classical computers that use bits representing 0 or 1, quantum computers use qubits, which can represent 0, 1, or both simultaneously.</p>
                    
                    <h3>Core Concepts:</h3>
                    <ul>
                        <li><b>Qubits:</b> The basic unit of quantum information.</li>
                        <li><b>Superposition:</b> Qubits can exist in multiple states at once.</li>
                        <li><b>Entanglement:</b> Qubits can become linked, where the state of one instantly influences the state of another, regardless of distance.</li>
                        <li><b>Quantum Gates:</b> Operations performed on qubits, analogous to logic gates in classical computing.</li>
                    </ul>
                    
                    <p>While still in its early stages, quantum computing holds immense potential for solving problems currently intractable for classical computers, such as drug discovery, materials science, and complex optimization.</p>
                    
                    <h3>Getting Started for Developers:</h3>
                    <p>Developers can explore quantum computing using simulators and SDKs provided by companies like IBM (Qiskit) and Microsoft (Q#). Basic understanding of linear algebra and quantum mechanics is beneficial but not always a prerequisite for initial exploration.</p>
                `,
                imageUrl: "https://images.unsplash.com/photo-1590409462529-65cf9ed12224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDR8MHwxfHNlYXJjaHw4fHxxdWFudHVtJTIwY29tcHV0aW5nfGVufDB8fHx8fDE3MjA1NzA4MTJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
                date: new Date("2024-06-20"),
                author: {
                    name: "Melkamu Wako",
                    imageUrl: "assets/img/MELKAMU.jpg",
                    bio: "Full-stack developer and technical writer fascinated by the future of computing."
                },
                tags: ["Quantum Computing", "Emerging Tech", "Programming"],
                views: 800,
                commentsCount: 4
            },
            {
                title: "Embracing Serverless: Building Scalable Apps with Minimal Ops",
                slug: "embracing-serverless",
                description: "Understand the benefits and challenges of serverless architecture and how to build highly scalable applications.",
                content: `
                    <h2>What is Serverless Architecture?</h2>
                    <p>Serverless architecture allows you to build and run applications and services without having to manage infrastructure. Your cloud provider (e.g., AWS Lambda, Google Cloud Functions, Azure Functions) automatically provisions, scales, and manages the servers.</p>
                    
                    <h3>Key Benefits:</h3>
                    <ul>
                        <li><b>Reduced Operational Overhead:</b> No server provisioning, patching, or scaling to worry about.</li>
                        <li><b>Automatic Scaling:</b> Applications scale automatically with demand, handling traffic spikes seamlessly.</li>
                        <li><b>Cost Efficiency:</b> You only pay for the compute time consumed, making it highly cost-effective for event-driven workloads.</li>
                        <li><b>Faster Development:</b> Developers can focus solely on writing code for specific functions, accelerating development cycles.</li>
                    </ul>
                    
                    <h3>Considerations:</h3>
                    <p>While powerful, serverless architectures come with considerations like vendor lock-in, cold starts for infrequently used functions, and debugging complexities across distributed services.</p>
                    
                    <h3>Common Use Cases:</h3>
                    <ul>
                        <li>Web APIs & Backends</li>
                        <li>Data Processing & ETL</li>
                        <li>Chatbots & IoT Backends</li>
                        <li>Event-Driven Architectures</li>
                    </ul>
                `,
                imageUrl: "https://images.unsplash.com/photo-1616401037389-9a742416f585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDR8MHwxfHNlYXJjaHwxfHxzZXJ2ZXJsZXNzJTIwY2xvdWR8ZW58MHx8fHwxNzIwNTcwODc5fDA&ixlib=rb-4.0.3&q=80&w=1080",
                date: new Date("2024-05-10"),
                author: {
                    name: "Melkamu Wako",
                    imageUrl: "assets/img/MELKAMU.jpg",
                    bio: "Full-stack developer and technical writer passionate about scalable cloud solutions."
                },
                tags: ["Serverless", "Cloud Computing", "AWS Lambda", "Scalability"],
                views: 1100,
                commentsCount: 6
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