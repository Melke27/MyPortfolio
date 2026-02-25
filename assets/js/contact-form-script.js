document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successDiv = document.getElementById('success');
    const errorDiv = document.getElementById('error');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: contactForm.name.value.trim(),
                email: contactForm.email.value.trim(),
                subject: contactForm.subject.value.trim(),
                message: contactForm.message.value.trim()
            };

            // Validate
            if (!formData.name || !formData.email || !formData.message) {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all required fields.';
                successDiv.style.display = 'none';
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                console.log('Sending contact form to API...');
                
                const resp = await fetch('/api/contacts', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                console.log('Response status:', resp.status);

                if (resp.ok) {
                    const data = await resp.json();
                    console.log('Success:', data);
                    successDiv.style.display = 'block';
                    successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
                    errorDiv.style.display = 'none';
                    contactForm.reset();
                } else {
                    const errorData = await resp.json();
                    console.error('Error response:', errorData);
                    throw new Error(errorData.message || 'Failed to send message');
                }
            } catch (error) {
                console.error('Contact form error:', error);
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Sorry, there was an error sending your message. Please try again or email directly.';
                successDiv.style.display = 'none';
            } finally {
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
