document.addEventListener('DOMContentLoaded', function () {
    // Assign staggered animation indices for grid items
    document.querySelectorAll('.skills-container .skill-box').forEach((box, index) => {
        box.style.setProperty('--item-index', index);
    });

    document.querySelectorAll('.projects-grid .project-card').forEach((card, index) => {
        card.style.setProperty('--item-index', index);
    });

    // Add parallax scrolling to hero section
    const heroSection = document.getElementById('home');
    if (heroSection) {
        window.addEventListener('scroll', function () {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < window.innerHeight) {
                // Create parallax effect for hero background
                heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            }
        });
    }

    // Smooth transition when page loads
    window.addEventListener('load', function () {
        document.body.classList.add('page-loaded');
    });

    // Add preloading for smoother experience
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('img-loaded');
        } else {
            img.addEventListener('load', function () {
                img.classList.add('img-loaded');
            });
        }
    });

    // Animate skill meters when they enter the viewport
    const skillBars = document.querySelectorAll('.skills-container .progress');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.getAttribute('data-progress');
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => skillObserver.observe(bar));
});
