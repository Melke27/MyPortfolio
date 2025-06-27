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
                imageUrl: "/assets/img/portfolio-1.jpg",
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
                imageUrl: "/assets/img/coding-desk.jpg",
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
                imageUrl: "/assets/img/portfolio-4.jpg",
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
                imageUrl: "/assets/img/ai-cloud-coding.jpg",
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
                imageUrl: "/assets/img/quantum-network.jpg",
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
                title: "Navigating the Cyberspace: Essential Cybersecurity Tips for Developers",
                slug: "cybersecurity-tips-for-developers",
                description: "A guide for developers to understand and implement crucial cybersecurity practices in their projects and daily routines.",
                content: `
                    <h2>Why Cybersecurity Matters for Developers</h2>
                    <p>In today's interconnected world, every line of code can be a potential vulnerability. Developers play a critical role in building secure applications and protecting user data.</p>
                    
                    <h3>Key Practices:</h3>
                    <ul>
                        <li><b>Secure Coding Principles:</b> Adhere to OWASP Top 10 guidelines, perform input validation, and use parameterized queries to prevent SQL injection and XSS.</li>
                        <li><b>Dependency Management:</b> Regularly audit and update third-party libraries to mitigate known vulnerabilities. Tools like Dependabot can automate this.</li>
                        <li><b>Authentication & Authorization:</b> Implement strong, multi-factor authentication (MFA) and granular access controls. Never store plain-text passwords.</li>
                        <li><b>Data Encryption:</b> Encrypt sensitive data both in transit (TLS/SSL) and at rest (disk encryption, database encryption).</li>
                        <li><b>Security Testing:</b> Incorporate static application security testing (SAST), dynamic application security testing (DAST), and penetration testing into your CI/CD pipeline.</li>
                        <li><b>Incident Response:</b> Have a plan for detecting, responding to, and recovering from security incidents.</li>
                    </ul>
                    
                    <p>By integrating security into every stage of the development lifecycle, developers can significantly reduce the risk of breaches and build more resilient software.</p>
                `,
                imageUrl: "/assets/img/cyper.jpg",
                date: new Date("2024-07-10"),
                author: {
                    name: "Melkamu Wako",
                    imageUrl: "assets/img/MELKAMU.jpg",
                    bio: "Full-stack developer and technical writer with a focus on secure software development."
                },
                tags: ["Cybersecurity", "Development", "Security", "Best Practices"],
                views: 900,
                commentsCount: 7
            },
            {
                title: "Embracing Serverless: Building Scalable Apps with Minimal Ops",
                slug: "embracing-serverless",
                description: "Understand the benefits and challenges of serverless architecture and how to build highly scalable applications.",
                content: `
                    <h2>The Serverless Paradigm</h2>
                    <p>Serverless architecture allows you to build and run applications and services without having to manage infrastructure. Your cloud provider automatically provisions, scales, and manages the servers.</p>
                    
                    <h3>Advantages:</h3>
                    <ul>
                        <li><b>Reduced Operational Overhead:</b> No server provisioning, patching, or scaling to worry about.</li>
                        <li><b>Scalability:</b> Automatically scales with demand, handling spikes in traffic seamlessly.</li>
                        <li><b>Cost-Efficiency:</b> You only pay for the compute time consumed, making it cost-effective for intermittent workloads.</li>
                        <li><b>Faster Development:</b> Developers can focus solely on writing code, accelerating time-to-market.</li>
                    </ul>
                    
                    <h3>Popular Serverless Platforms:</h3>
                    <ul>
                        <li>AWS Lambda</li>
                        <li>Azure Functions</li>
                        <li>Google Cloud Functions</li>
                    </ul>
                    
                    <p>While serverless offers many benefits, it's essential to understand its nuances, such as vendor lock-in, cold starts, and debugging complexities, to leverage its full potential.</p>
                `,
                imageUrl: "/assets/img/serverless.jpg",
                date: new Date("2024-06-01"),
                author: {
                    name: "Melkamu Wako",
                    imageUrl: "assets/img/MELKAMU.jpg",
                    bio: "Full-stack developer and technical writer exploring cloud and serverless technologies."
                },
                tags: ["Serverless", "Cloud Computing", "AWS", "Scalability"],
                views: 600,
                commentsCount: 2
            },
            {
                title: "Essential Data Structures Every Developer Should Know",
                slug: "essential-data-structures",
                description: "A comprehensive guide to fundamental data structures and their real-world applications in software development.",
                content: `
                    <h2>Introduction to Data Structures</h2>
                    <p>Data structures are fundamental building blocks in computer science that help organize and store data efficiently. Understanding them is crucial for writing optimized code.</p>
                    
                    <h2>Key Data Structures</h2>
                    <ul>
                        <li><b>Arrays:</b> Fixed-size collections of elements</li>
                        <li><b>Linked Lists:</b> Dynamic data structure with nodes</li>
                        <li><b>Stacks:</b> LIFO (Last In, First Out) structure</li>
                        <li><b>Queues:</b> FIFO (First In, First Out) structure</li>
                        <li><b>Trees:</b> Hierarchical data structure</li>
                        <li><b>Graphs:</b> Network of connected nodes</li>
                    </ul>
                    
                    <h2>Real-World Applications</h2>
                    <p>Learn how these data structures are used in real-world applications and when to choose each one for optimal performance.</p>
                `,
                imageUrl: "/assets/img/portfolio-1.jpg",
                date: new Date("2024-03-20"),
                author: {
                    name: "Melkamu Wako",
                    imageUrl: "/assets/img/MELKAMU.jpg",
                    bio: "Full-stack developer passionate about algorithms and data structures."
                },
                tags: ["Data Structures", "Algorithms", "Computer Science"],
                views: 1200,
                commentsCount: 15
            },
            {
                title: "Modern Web Development: A Complete Guide",
                slug: "modern-web-development",
                description: "Explore the latest trends, tools, and best practices in modern web development.",
                content: `
                    <h2>The Evolution of Web Development</h2>
                    <p>Web development has evolved significantly over the years, from static HTML pages to dynamic, interactive applications.</p>
                    
                    <h2>Key Technologies</h2>
                    <ul>
                        <li><b>Frontend:</b> React, Vue, Angular</li>
                        <li><b>Backend:</b> Node.js, Python, Java</li>
                        <li><b>Databases:</b> MongoDB, PostgreSQL, MySQL</li>
                        <li><b>DevOps:</b> Docker, Kubernetes, CI/CD</li>
                    </ul>
                    
                    <h2>Best Practices</h2>
                    <p>Learn about responsive design, performance optimization, and security best practices in modern web development.</p>
                `,
                imageUrl: "/assets/img/portfolio-3.jpg",
                date: new Date("2024-03-18"),
                author: {
                    name: "Melkamu Wako",
                    imageUrl: "/assets/img/MELKAMU.jpg",
                    bio: "Full-stack developer specializing in modern web technologies."
                },
                tags: ["Web Development", "JavaScript", "React", "Node.js"],
                views: 1500,
                commentsCount: 20
            },
            {
                title: "Cybersecurity Essentials for Developers",
                slug: "cybersecurity-essentials",
                description: "Learn fundamental cybersecurity practices and how to protect your applications from common threats.",
                content: `
                    <h2>Understanding Cybersecurity</h2>
                    <p>Cybersecurity is crucial in today's digital world. Learn how to protect your applications and data from various threats.</p>
                    
                    <h2>Common Threats</h2>
                    <ul>
                        <li><b>SQL Injection:</b> Preventing database attacks</li>
                        <li><b>XSS (Cross-Site Scripting):</b> Protecting against malicious scripts</li>
                        <li><b>CSRF (Cross-Site Request Forgery):</b> Securing form submissions</li>
                        <li><b>Authentication:</b> Implementing secure login systems</li>
                    </ul>
                    
                    <h2>Security Best Practices</h2>
                    <p>Learn about encryption, secure coding practices, and how to implement proper security measures in your applications.</p>
                `,
                imageUrl: "/assets/img/portfolio-4.jpg",
                date: new Date("2024-03-15"),
                author: {
                    name: "Melkamu Wako",
                    imageUrl: "/assets/img/MELKAMU.jpg",
                    bio: "Full-stack developer with a focus on secure application development."
                },
                tags: ["Cybersecurity", "Web Security", "Best Practices"],
                views: 1800,
                commentsCount: 25
            },
            {
                title: "AI in Everyday Life: New Innovations",
                slug: "ai-everyday-life",
                description: "Discover how artificial intelligence is transforming daily experiences, from smart assistants to healthcare.",
                content: `
                    <h2>AI in Our World</h2>
                    <p>Artificial Intelligence is now part of our daily lives, powering everything from voice assistants to medical diagnostics.</p>
                    <h2>Key Innovations</h2>
                    <ul>
                        <li>Smart Home Devices</li>
                        <li>Healthcare Diagnostics</li>
                        <li>Personalized Recommendations</li>
                    </ul>
                `,
                imageUrl: "/assets/img/portfolio-4.jpg",
                date: new Date("2025-06-10"),
                author: {
                    name: "Melkamu Wako",
                    imageUrl: "/assets/img/MELKAMU.jpg",
                    bio: "Full-stack developer and AI enthusiast."
                },
                tags: ["AI", "Innovation", "Technology"],
                views: 50,
                commentsCount: 0
            }
        ];

        for (const postData of blogPosts) {
            await BlogPost.findOneAndUpdate(
                { slug: postData.slug },
                { $set: postData },
                { upsert: true, new: true }
            );
        }
        console.log('Blog posts seeded successfully!');

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
};

seedDatabase(); 