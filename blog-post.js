document.addEventListener('DOMContentLoaded', () => {
    // Get the slug from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        document.body.innerHTML = '<div class="container mt-5"><h1>Blog Post Not Found</h1></div>';
        return;
    }

    // Fetch the blog post data
    fetch(`https://melkamuwako27-backend.onrender.com/api/blogposts/${slug}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Blog post not found');
            }
            return response.json();
        })
        .then(post => {
            // Update the page title
            document.title = `${post.title} - Melkamu Wako`;

            // Create the blog post content
            const content = `
                <div class="container">
                    <div class="blog-post-header">
                        <h1 class="display-4 mb-3">${post.title}</h1>
                        <div class="blog-post-meta">
                            <span><i class="fas fa-calendar"></i> ${new Date(post.date).toLocaleDateString()}</span>
                            <span><i class="fas fa-eye"></i> ${post.views} views</span>
                            <span><i class="fas fa-comments"></i> ${post.commentsCount} comments</span>
                        </div>
                    </div>

                    <img src="${post.imageUrl}" alt="${post.title}" class="blog-post-image">

                    <div class="blog-post-content">
                        ${post.content}
                    </div>

                    <div class="blog-post-tags">
                        ${post.tags.map(tag => `
                            <span class="badge">${tag}</span>
                        `).join('')}
                    </div>

                    <div class="author-info">
                        <div class="d-flex align-items-center mb-3">
                            <img src="${post.author.imageUrl}" alt="${post.author.name}" class="author-image">
                            <div class="ms-3">
                                <h4>${post.author.name}</h4>
                                <p class="mb-0">${post.author.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Update the main content
            document.querySelector('.container').innerHTML = content;
        })
        .catch(error => {
            console.error('Error:', error);
            document.body.innerHTML = `
                <div class="container mt-5">
                    <h1 class="text-danger">Blog Post Not Found</h1>
                    <p>${error.message}</p>
                </div>
            `;
        });
});
