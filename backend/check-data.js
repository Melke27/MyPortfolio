// Quick check script
async function check() {
    const [blogs, skills, certs, exp] = await Promise.all([
        fetch('https://melkamuwako27-backend.onrender.com/api/blogposts').then(r => r.json()),
        fetch('https://melkamuwako27-backend.onrender.com/api/skills').then(r => r.json()),
        fetch('https://melkamuwako27-backend.onrender.com/api/certifications').then(r => r.json()),
        fetch('https://melkamuwako27-backend.onrender.com/api/experiences').then(r => r.json())
    ]);
    console.log(`📝 Blogs: ${blogs.length}`);
    console.log(`💻 Skills: ${skills.length}`);
    console.log(`🏆 Certifications: ${certs.length}`);
    console.log(`💼 Experience: ${exp.length}`);
}
check();
