// Sample data for Skills, Certifications, Experiences, and Testimonials
// Run: node seed-data.js

const sampleSkills = [
    { name: "JavaScript", category: "Frontend", level: 90 },
    { name: "React", category: "Frontend", level: 85 },
    { name: "HTML/CSS", category: "Frontend", level: 95 },
    { name: "Node.js", category: "Backend", level: 80 },
    { name: "Express.js", category: "Backend", level: 78 },
    { name: "MongoDB", category: "Database", level: 82 },
    { name: "Python", category: "Backend", level: 75 },
    { name: "Java", category: "Backend", level: 70 },
    { name: "Git", category: "Tools", level: 88 },
    { name: "VS Code", category: "Tools", level: 95 },
    { name: "SQL", category: "Database", level: 75 },
    { name: "Bootstrap", category: "Frontend", level: 90 }
];

const sampleCerts = [
    {
        name: "Full-Stack Web Development",
        issuer: "INSA Summer Camp 2025",
        description: "Intensive 8-week program covering MERN stack development",
        date: "2025-08-15",
        url: "https://example.com/cert1"
    },
    {
        name: "Introduction to Cybersecurity",
        issuer: "Cisco Networking Academy",
        description: "Foundational cybersecurity course covering network security basics",
        date: "2025-06-01",
        url: "https://example.com/cert2"
    },
    {
        name: "Full-Stack Web Development",
        issuer: "Coursera",
        description: "Professional certificate in full-stack web development",
        date: "2025-04-20",
        url: "https://example.com/cert3"
    },
    {
        name: "JavaScript Algorithms and Data Structures",
        issuer: "FreeCodeCamp",
        description: "Complete JavaScript certification with 300+ hours of content",
        date: "2025-02-10",
        url: "https://example.com/cert4"
    },
    {
        name: "Python for Everybody",
        issuer: "Coursera",
        description: "Specialization in Python programming",
        date: "2024-12-01",
        url: "https://example.com/cert5"
    }
];

const sampleExp = [
    {
        title: "Full-Stack Developer",
        company: "EthioHeritage360",
        location: "Addis Ababa, Ethiopia",
        description: "Building a national-scale digital heritage platform. Working with React, Node.js, Express, MongoDB, and 3D/AR technologies.",
        startDate: "2025-06-01",
        endDate: "",
        current: true
    },
    {
        title: "Web Development Intern",
        company: "INSA Summer Camp",
        location: "Addis Ababa, Ethiopia",
        description: "Full-stack web development training and project work.",
        startDate: "2025-01-15",
        endDate: "2025-05-30",
        current: false
    },
    {
        title: "Peer Mentor",
        company: "CSEC ASTU",
        location: "Adama, Ethiopia",
        description: "Mentoring junior students in C++ and Data Structures & Algorithms.",
        startDate: "2024-09-01",
        endDate: "",
        current: true
    }
];

async function seedData() {
    try {
        // Add Skills
        for (const skill of sampleSkills) {
            await fetch('https://melkamuwako27-backend.onrender.com/api/skills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skill)
            });
        }
        console.log('✅ Skills added!');

        // Add Certifications
        for (const cert of sampleCerts) {
            await fetch('https://melkamuwako27-backend.onrender.com/api/certifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cert)
            });
        }
        console.log('✅ Certifications added!');

        // Add Experiences
        for (const exp of sampleExp) {
            await fetch('https://melkamuwako27-backend.onrender.com/api/experiences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(exp)
            });
        }
        console.log('✅ Experiences added!');

        console.log('🎉 All sample data added successfully!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

seedData();
