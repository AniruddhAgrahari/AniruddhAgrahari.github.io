// Anime.js animations for portfolio website
document.addEventListener('DOMContentLoaded', function() {
    // Hero text animation
    initHeroAnimations();
    
    // Initialize other animations
    initScrollAnimations();
    initButtonAnimations();
    initSocialIconAnimations();
});

function initHeroAnimations() {
    // Set initial state for hero elements
    anime.set('.hero-title', { opacity: 1 });
    anime.set('.hero-subtitle', { opacity: 0, translateY: 30 });
    anime.set('.hero-roles', { opacity: 0, translateY: 30 });
    anime.set('.hero-buttons', { opacity: 0, translateY: 30 });
    anime.set('.hero-social', { opacity: 0, translateY: 30 });
    anime.set('.scroll-down-indicator', { opacity: 0, translateY: 30 });

    // Main animation timeline
    const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 750
    });

    // Title animation (simple fade in)
    tl.add({
        targets: '.hero-title',
        opacity: [1, 1],
        translateY: [0, 0],
        duration: 1
    })
    // Subtitle animation
    .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        offset: '-=0'
    })
    // Roles animation
    .add({
        targets: '.hero-roles',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        offset: '-=300'
    })
    // Buttons animation
    .add({
        targets: '.hero-buttons',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        offset: '-=200'
    })
    // Social icons animation
    .add({
        targets: '.hero-social a',
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.5, 1],
        duration: 400,
        delay: (el, i) => 100 * i,
        offset: '-=400'
    })
    // Scroll indicator animation
    .add({
        targets: '.scroll-down-indicator',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        offset: '-=200'
    });

    // Continuous bounce animation for scroll indicator
    anime({
        targets: '.scroll-down-indicator',
        translateY: [0, 10],
        duration: 1500,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        delay: 2000
    });
}

function initScrollAnimations() {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Section titles animation
                if (target.classList.contains('section-title')) {
                    anime({
                        targets: target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                }
                
                // Project cards animation
                if (target.classList.contains('project-card')) {
                    anime({
                        targets: target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        scale: [0.9, 1],
                        duration: 800,
                        easing: 'easeOutQuart',
                        delay: Math.random() * 200
                    });
                }
                
                // Skill boxes animation
                if (target.classList.contains('skill-box')) {
                    anime({
                        targets: target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        easing: 'easeOutQuart',
                        delay: Math.random() * 300
                    });
                    
                    // Animate progress bars
                    const progressBar = target.querySelector('.progress');
                    if (progressBar) {
                        const targetWidth = progressBar.getAttribute('data-progress');
                        anime({
                            targets: progressBar,
                            width: [0, targetWidth],
                            duration: 1500,
                            easing: 'easeOutQuart',
                            delay: 400
                        });
                    }
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.section-title, .project-card, .skill-box').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function initButtonAnimations() {
    // Button hover animations
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            anime({
                targets: btn,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            anime({
                targets: btn,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        btn.addEventListener('mousedown', () => {
            anime({
                targets: btn,
                scale: 0.95,
                duration: 100,
                easing: 'easeOutQuart'
            });
        });
        
        btn.addEventListener('mouseup', () => {
            anime({
                targets: btn,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
}

function initSocialIconAnimations() {
    // Social icons hover animation
    document.querySelectorAll('.social-icons a').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            anime({
                targets: icon,
                scale: 1.2,
                rotateZ: 10,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        icon.addEventListener('mouseleave', () => {
            anime({
                targets: icon,
                scale: 1,
                rotateZ: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Navigation link hover animations
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                translateY: -2,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            anime({
                targets: link,
                translateY: 0,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
});
