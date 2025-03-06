document.addEventListener('DOMContentLoaded', function () {
    // Create canvas for particles
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        heroSection.appendChild(canvas);

        // Initialize particles
        initParticles();
    }
});

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas to full hero section size
    const heroSection = document.getElementById('home');
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;

    // Particle settings
    const particleCount = 100;
    const particleColor = 'rgba(249, 202, 36, 0.5)'; // Yellow to match theme
    const particles = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 1,
            speedX: (Math.random() - 0.5) * 1,
            speedY: (Math.random() - 0.5) * 1,
            depth: Math.random() * 50
        });
    }

    // Animation function
    function animateParticles() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(p => {
            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around edges
            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;
            if (p.y > canvas.height) p.y = 0;
            if (p.y < 0) p.y = canvas.height;

            // Draw particle
            const opacity = 0.3 + (p.depth / 100) * 0.5;
            ctx.fillStyle = `rgba(249, 202, 36, ${opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    // Start animation
    animateParticles();

    // Handle window resize
    window.addEventListener('resize', function () {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    });
}
