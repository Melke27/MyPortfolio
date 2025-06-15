const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

const seedDatabase = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myportfolio';
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected for seeding');

        // Clear existing blog posts
        await BlogPost.deleteMany({});
        console.log('Existing blog posts cleared');

        // Sample blog posts
        const blogPosts = [
            {
                title: "Understanding JavaScript Closures",
                slug: "understanding-javascript-closures",
                description: "A comprehensive guide to understanding JavaScript closures, their practical applications, and common use cases.",
                content: "<h2>What are JavaScript Closures?</h2>\n<p>A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created.</p>",
                imageUrl: "https://via.placeholder.com/400x250/8BC34A/ffffff?text=Blog+Post",
                tags: ["javascript", "programming", "web development"]
            },
            {
                title: "Introduction to React.js",
                slug: "introduction-to-reactjs",
                description: "A beginner's guide to React.js - building reusable components, state management, and modern web applications.",
                content: "<h2>What is React.js?</h2>\n<p>React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.</p>",
                imageUrl: "https://via.placeholder.com/400x250/8BC34A/ffffff?text=Blog+Post",
                tags: ["react", "javascript", "frontend"]
            },
            {
                title: "Building RESTful APIs with Node.js",
                slug: "restful-apis-with-nodejs",
                description: "Learn how to build scalable and maintainable RESTful APIs using Node.js and Express.",
                content: "<h2>What are RESTful APIs?</h2>\n<p>REST (Representational State Transfer) is an architectural style for designing distributed systems. It's commonly used for web services.</p>",
                imageUrl: "https://via.placeholder.com/400x250/8BC34A/ffffff?text=Blog+Post",
                tags: ["nodejs", "api", "backend"]
            }
        ];

        // Insert blog posts
        await BlogPost.insertMany(blogPosts);
        console.log('Blog posts seeded successfully');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
};

// Run the seeder
seedDatabase();
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