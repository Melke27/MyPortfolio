document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            const subjectInput = contactForm.querySelector('input[name="subject"]');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            const errorMessageElements = contactForm.querySelectorAll('.error-message');
            errorMessageElements.forEach(el => el.textContent = ''); // Clear previous errors

            let isValid = true;

            if (!name) {
                isValid = false;
                if (nameInput) nameInput.nextElementSibling.textContent = 'Name is required.';
            }
            if (!email) {
                isValid = false;
                if (emailInput) emailInput.nextElementSibling.textContent = 'Email is required.';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                isValid = false;
                if (emailInput) emailInput.nextElementSibling.textContent = 'Invalid email format.';
            }
            if (!message) {
                isValid = false;
                if (messageInput) messageInput.nextElementSibling.textContent = 'Message is required.';
            }

            if (!isValid) {
                return;
            }

            const formData = { name, email, subject, message };

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            try {
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();
                alert(result.message);

                if (response.ok) {
                    contactForm.reset();
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again later.');
            } finally {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // You might also want to add similar logic for your newsletter form if it's on this page
    // For melkamu wako landing page.html, it looks like there's no newsletter form.
}); 