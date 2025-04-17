// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !e.target.closest('.nav-menu') &&
        !e.target.closest('.hamburger')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Enhanced smooth scrolling
document.querySelectorAll('.nav-menu a, .cta-buttons a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Get the navbar height to offset the scrolling
            const navHeight = document.querySelector('#navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

            // Smooth scroll with customized duration based on distance
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = Math.min(1000, Math.max(500, Math.abs(distance) / 2));
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                // Easing function for smoother scrolling (easeInOutCubic)
                const ease = progress => progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                window.scrollTo(0, startPosition + distance * ease(progress));

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        }
    });
});

// Scroll reveal animation for sections
const revealElements = document.querySelectorAll(
  '.hero-content, .section-padding, .section-title, .about-content, .skill-box, .project-card, .contact-wrapper'
);
const revealOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(element => {
    element.classList.add('reveal-element');
    revealOnScroll.observe(element);
});

// Performance optimization for scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;

            // Sticky Navigation (reusing existing code but optimized)
            const navbar = document.querySelector('#navbar');
            if (window.scrollY > 50) {
                navbar.style.background = '#fff';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = '#fff';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }

            // Active Navigation Link
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-menu a');

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
        }, 20); // 20ms throttle
    }
});

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
                    showToast('Thank you! Your message has been sent successfully.', 'success');
                })
                .catch(error => {
                    formStatus.innerHTML = '<p class="error">Oops! There was a problem sending your message. Please try again.</p>';
                    showToast('Oops! There was a problem sending your message.', 'error');
                    console.error('Error:', error);
                });
        });
    }

    // Typewriter
    const roles = ["Designer", "Developer", "Problem‑Solver"];
    const typedEl = document.getElementById('typed-roles');
    let roleIdx = 0, charIdx = 0, isDeleting = false;
    function typeRole() {
        const role = roles[roleIdx];
        if (!isDeleting) {
            typedEl.textContent = role.substring(0, charIdx++);
        } else {
            typedEl.textContent = role.substring(0, charIdx--);
        }
        let delay = isDeleting ? 50 : 150;
        if (charIdx === role.length + 1) {
            isDeleting = true;
            delay = 1000;
            charIdx = role.length;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            delay = 500;
        }
        setTimeout(typeRole, delay);
    }
    if (typedEl) typeRole();

    // Scroll progress bar
    const progressBar = document.getElementById('progress-bar');
    const indicator = document.querySelector('.scroll-down-indicator');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = (scrollY / docH) * 100;
        progressBar.style.width = pct + '%';
        // Hide indicator after scrolling
        if (scrollY > 50) {
            indicator && indicator.classList.add('hidden');
        } else {
            indicator && indicator.classList.remove('hidden');
        }
    });

    // Scroll-down indicator click
    const down = document.querySelector('.scroll-down-indicator');
    down && down.addEventListener('click', () => {
        const target = document.getElementById('about');
        const navH = document.getElementById('navbar').offsetHeight;
        const top = target.offsetTop - navH;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Micro-interactions: ripple effect and toast functionality
document.addEventListener('DOMContentLoaded', () => {
  // Ripple effect on buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      const size = Math.max(this.clientWidth, this.clientHeight);
      ripple.style.width = ripple.style.height = `${size}px`;
      const rect = this.getBoundingClientRect();
      ripple.style.left = `${e.clientX - rect.left - size/2}px`;
      ripple.style.top = `${e.clientY - rect.top - size/2}px`;
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // Prepare toast container
  if (!document.getElementById('toast-container')) {
    const tc = document.createElement('div');
    tc.id = 'toast-container';
    document.body.appendChild(tc);
  }

  // Global showToast function
  window.showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.getElementById('toast-container').appendChild(toast);
    // animate in
    setTimeout(() => toast.classList.add('visible'), 50);
    // auto-remove
    setTimeout(() => {
      toast.classList.remove('visible');
      toast.addEventListener('transitionend', () => toast.remove());
    }, 4000);
  };
});
