document.addEventListener('DOMContentLoaded', function() {
    // Form validation only
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
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
                e.preventDefault();
            }
        });
    }
}); 