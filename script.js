// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('#navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#fff';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Projects filtering functionality could be added here
// Animation on scroll could be added here using libraries like AOS

// Function to handle form submission responses
document.addEventListener('DOMContentLoaded', function () {
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = urlParams.get('message');

    if (status && message) {
        // Create alert element
        const alertElement = document.createElement('div');
        alertElement.className = `alert ${status === 'success' ? 'alert-success' : 'alert-error'}`;
        alertElement.textContent = message;

        // Add alert to the DOM
        const contactForm = document.getElementById('contactForm');
        contactForm.parentNode.insertBefore(alertElement, contactForm);

        // Remove alert after 5 seconds
        setTimeout(() => {
            alertElement.remove();
            // Clean URL without reloading
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 5000);
    }
});

// Improve the form submission handler
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Show loading message
            formStatus.innerHTML = '<p class="loading">Sending message...</p>';
            formStatus.style.display = 'block';

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    formStatus.innerHTML = '<p class="success">Thank you! Your message has been sent successfully.</p>';
                    contactForm.reset();
                    // Keep the success message visible
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                })
                .catch(error => {
                    formStatus.innerHTML = '<p class="error">Oops! There was a problem sending your message. Please try again.</p>';
                    console.error('Error:', error);
                });
        });
    }
});
