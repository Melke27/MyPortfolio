const API_URL = 'https://melkamuwako27-backend.onrender.com/api';

// Project API calls
async function getProjects() {
  try {
    const response = await fetch(`${API_URL}/projects`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Contact form submission
async function submitContactForm(formData) {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

// Add event listener for contact form submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };

      try {
        await submitContactForm(formData);
        alert('Message sent successfully!');
        contactForm.reset();
      } catch (error) {
        alert('Error sending message. Please try again.');
      }
    });
  }
}); 