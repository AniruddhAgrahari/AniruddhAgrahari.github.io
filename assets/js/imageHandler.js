document.addEventListener('DOMContentLoaded', function () {
    // Handle project images
    const projectImages = document.querySelectorAll('.project-img img');
    const placeholderImage = 'assets/images/project-placeholder.jpg';

    projectImages.forEach(img => {
        // Set a default placeholder if the image fails to load
        img.onerror = function () {
            // Only replace if not already using placeholder and not already attempted
            if (!img.src.includes('project-placeholder') && !img.dataset.attempted) {
                console.log('Image failed to load, using placeholder:', img.src);
                img.dataset.attempted = 'true'; // Mark as attempted to avoid loops
                img.src = placeholderImage;
            }
        };
    });
});
