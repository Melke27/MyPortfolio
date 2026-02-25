// Sample blog posts to add to your database
// Run this file after server is running: node seed-blogs.js

const sampleBlogs = [
    {
        title: "Introduction to Full-Stack Web Development",
        slug: "introduction-to-fullstack-web-development",
        description: "Learn the fundamentals of full-stack development and what it takes to become a proficient full-stack developer.",
        content: `Full-stack web development is one of the most in-demand skills in today's tech industry. As a full-stack developer, you have the ability to work on both the front-end and back-end of web applications.

## What is Full-Stack Development?

Full-stack development refers to the practice of working on all aspects of a web application, from the user interface to the server-side logic and database management.

### Key Technologies

- **Front-end**: HTML, CSS, JavaScript, React, Vue, Angular
- **Back-end**: Node.js, Python, Java, PHP, Ruby
- **Database**: MongoDB, MySQL, PostgreSQL
- **Version Control**: Git, GitHub

## Getting Started

To become a full-stack developer, start by mastering HTML, CSS, and JavaScript. Then move on to learning a back-end language and database technology.

The journey may seem overwhelming, but with dedication and practice, anyone can become a proficient full-stack developer.

Happy coding!`,
        imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800",
        tags: ["Web Development", "Full-Stack", "Programming"],
        date: new Date("2025-01-15")
    },
    {
        title: "Building Your First MERN Stack Application",
        slug: "building-first-mern-stack-application",
        description: "A comprehensive guide to building a complete web application using MongoDB, Express, React, and Node.js.",
        content: `The MERN stack is a popular technology stack for building modern web applications. It consists of MongoDB, Express.js, React, and Node.js.

## Prerequisites

Before building a MERN stack application, you should have:
- Basic knowledge of JavaScript
- Understanding of HTML and CSS
- Familiarity with command line

## Step-by-Step Guide

### 1. Set Up the Project
Create a new directory and initialize your project with npm.

### 2. Build the Back-end
Set up Express.js server and connect to MongoDB database.

### 3. Create API Endpoints
Build RESTful APIs for CRUD operations.

### 4. Build the Front-end
Create React components and integrate with your API.

## Conclusion

Building a MERN stack application is a great way to learn full-stack development. Start small and gradually add more features as you gain confidence.`,
        imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
        tags: ["MERN Stack", "React", "Node.js", "MongoDB"],
        date: new Date("2025-02-01")
    },
    {
        title: "The Future of Web Development: What to Expect in 2025",
        slug: "future-of-web-development-2025",
        description: "Exploring emerging trends and technologies that will shape the future of web development.",
        content: `As we move further into 2025, web development continues to evolve at a rapid pace. Here are the key trends shaping the industry.

## AI-Powered Development

Artificial Intelligence is revolutionizing how we write code. From code completion to automated testing, AI tools are becoming indispensable.

## WebAssembly Growth

WebAssembly (Wasm) is enabling high-performance applications in the browser. We're seeing more applications leveraging Wasm for compute-intensive tasks.

## Serverless Architecture

Serverless computing continues to grow, allowing developers to focus on writing code rather than managing infrastructure.

## Edge Computing

Edge computing is bringing computation closer to users, resulting in faster response times and better user experiences.

## Stay Ahead

To succeed in web development, stay curious and keep learning. The best developers are those who adapt to change and embrace new technologies.`,
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
        tags: ["Web Development", "Trends", "Future"],
        date: new Date("2025-02-10")
    },
    {
        title: "Mastering Git: Essential Version Control Commands",
        slug: "mastering-git-essential-commands",
        description: "A practical guide to Git commands every developer should know for effective version control.",
        content: `Git is an essential tool for every developer. Here's a comprehensive guide to the most important Git commands.

## Basic Commands

### git init
Initialize a new Git repository in your project folder.

### git clone
Clone a remote repository to your local machine.

### git add
Stage changes for commit.

### git commit
Save your staged changes with a descriptive message.

## Branching Commands

### git branch
List, create, or delete branches.

### git checkout
Switch between branches.

### git merge
Combine changes from different branches.

## Advanced Tips

- Always write meaningful commit messages
- Use branches for new features
- Pull frequently to avoid conflicts
- Learn to resolve merge conflicts gracefully

## Conclusion

Mastering Git takes practice, but these essential commands will help you manage your code effectively throughout your development career.`,
        imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800",
        tags: ["Git", "Version Control", "Tools"],
        date: new Date("2025-02-15")
    },
    {
        title: "Responsive Web Design: Creating Mobile-Friendly Websites",
        slug: "responsive-web-design-mobile-friendly",
        description: "Learn how to create websites that look great on all devices using responsive design principles.",
        content: `In today's mobile-first world, responsive web design is crucial. Here's how to create websites that work perfectly on any device.

## What is Responsive Design?

Responsive design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes.

## Key Techniques

### 1. Flexible Grid Layouts
Use relative units like percentages instead of fixed pixels.

### 2. Media Queries
Apply different styles based on device characteristics.

### 3. Flexible Images
Ensure images scale appropriately on different screens.

### 4. Viewport Meta Tag
Include the viewport meta tag in your HTML.

## Best Practices

- Design for mobile first
- Test on multiple devices
- Optimize images for different screen sizes
- Use CSS frameworks like Bootstrap

## Conclusion

Responsive design is no longer optional—it's essential for providing the best user experience across all devices.`,
        imageUrl: "https://images.unsplash.com/photo-1512428559087-560fa0db7f59?w=800",
        tags: ["Responsive Design", "CSS", "Mobile"],
        date: new Date("2025-02-20")
    },
    {
        title: "Getting Started with React Hooks",
        slug: "getting-started-with-react-hooks",
        description: "A beginner's guide to understanding and using React Hooks in your applications.",
        content: `React Hooks have revolutionized how we write React components. Let's explore what they are and how to use them.

## What are Hooks?

Hooks are functions that let you use state and other React features without writing a class.

## Essential Hooks

### useState
Manage component state in functional components.

### useEffect
Handle side effects like data fetching and subscriptions.

### useContext
Access context values without nesting.

### useRef
Reference DOM elements or persist values across renders.

## Example

\`\`\`javascript
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  );
}
\`\`\`

## Conclusion

React Hooks make code more readable and reusable. Start using them in your projects today!`,
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
        tags: ["React", "JavaScript", "Hooks"],
        date: new Date("2025-02-22")
    }
];

async function addBlogs() {
    try {
        const response = await fetch('http://localhost:10000/api/blogposts/bulk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sampleBlogs)
        });

        if (response.ok) {
            console.log('✅ Blog posts added successfully!');
        } else {
            // Try adding one by one
            for (const blog of sampleBlogs) {
                await fetch('http://localhost:10000/api/blogposts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blog)
                });
            }
            console.log('✅ Blog posts added successfully!');
        }
    } catch (error) {
        console.error('Error:', error.message);
        console.log('Make sure the server is running: node backend/server.js');
    }
}

addBlogs();
