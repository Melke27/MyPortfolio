document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
  const successDiv = document.getElementById('success');
  const errorDiv = document.getElementById('error');

    if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();

      const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value
      };

      try {
        // Try local server first, then fallback to remote
        let resp = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        // If local fails, try remote
        if (!resp.ok) {
          resp = await fetch('https://melkamuwako27-backend.onrender.com/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
        }
        
        if (resp.ok) {
          successDiv.style.display = 'block';
          successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
          errorDiv.style.display = 'none';
          contactForm.reset();
        } else {
          throw new Error('Failed to send');
        }
      } catch (error) {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Sorry, there was an error sending your message. Please try again.';
        successDiv.style.display = 'none';
            }
        });
    }
}); 
