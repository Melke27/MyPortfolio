// Quick check script
async function check() {
    const [blogs, skills, certs, exp] = await Promise.all([
        fetch('http://localhost:10000/api/blogposts').then(r=>r.json()),
        fetch('http://localhost:10000/api/skills').then(r=>r.json()),
        fetch('http://localhost:10000/api/certifications').then(r=>r.json()),
        fetch('http://localhost:10000/api/experiences').then(r=>r.json())
    ]);
    console.log(`📝 Blogs: ${blogs.length}`);
    console.log(`💻 Skills: ${skills.length}`);
    console.log(`🏆 Certifications: ${certs.length}`);
    console.log(`💼 Experience: ${exp.length}`);
}
check();
