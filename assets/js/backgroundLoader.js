document.addEventListener('DOMContentLoaded', function () {
    // Apply hero background image programmatically
    const heroSection = document.getElementById('home');

    if (heroSection) {
        // Try to load the background image
        const img = new Image();
        img.onload = function () {
            console.log('Background image loaded successfully');
            heroSection.style.backgroundImage = "url('assets/images/projects/4.jpg')";
        };

        img.onerror = function () {
            console.error('Failed to load hero background image');
            // Try an alternative path
            const alternativeImg = new Image();
            alternativeImg.onload = function () {
                console.log('Alternative background image loaded');
                heroSection.style.backgroundImage = "url('../assets/images/projects/4.jpg')";
            };
            alternativeImg.onerror = function () {
                console.error('All background image attempts failed');
            };
            alternativeImg.src = '../assets/images/projects/4.jpg';
        };

        img.src = 'assets/images/projects/4.jpg';
    }
});
