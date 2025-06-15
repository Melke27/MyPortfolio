// Blog Posts Section
async function fetchBlogPosts() {
    try {
        // Use the correct backend URL without port (Render handles this)
        const response = await fetch('https://melkamuwako27-backend.onrender.com/api/blogposts', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        
        const blogPostsContainer = document.getElementById('blog-posts-container');
        if (!blogPostsContainer) return;

        if (!Array.isArray(posts) || posts.length === 0) {
            blogPostsContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger text-center">
                        <h4 class="alert-heading">No Posts</h4>
                        <p>No blog posts available at the moment.</p>
                    </div>
                </div>
            `;
            return;
        }

        blogPostsContainer.innerHTML = posts.map(post => `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <img src="${post.imageUrl}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <h3 class="card-title">${post.title}</h3>
                        <p class="card-text">${post.description}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <small class="text-muted">
                                <i class="fas fa-calendar-alt mr-2"></i>
                                ${new Date(post.date).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </small>
                            <a href="https://melkamuwako27-backend.onrender.com/blog/${post.slug}" class="btn btn-sm btn-primary">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Show/hide view all posts button based on number of posts
        const viewAllPostsBtn = document.getElementById('view-all-posts-btn');
        if (viewAllPostsBtn) {
            viewAllPostsBtn.style.display = posts.length > 3 ? 'block' : 'none';
            viewAllPostsBtn.href = 'https://melkamuwako27-backend.onrender.com/blog';
        }
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        const blogPostsContainer = document.getElementById('blog-posts-container');
        if (blogPostsContainer) {
            blogPostsContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger text-center">
                        <h4 class="alert-heading">Error</h4>
                        <p>Failed to load blog posts. Please try again later.</p>
                    </div>
                </div>
            `;
        }
    }
}

// Load blog posts when the page loads
document.addEventListener('DOMContentLoaded', fetchBlogPosts);
