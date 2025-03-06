document.addEventListener('DOMContentLoaded', function () {
    // 3D Project Cards
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Calculate rotation based on mouse position
            const rotateY = (mouseX - cardCenterX) / 10;
            const rotateX = (cardCenterY - mouseY) / 10;

            // Apply 3D rotation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.transition = 'transform 0.1s';
        });

        card.addEventListener('mouseleave', function () {
            // Reset transform on mouse leave
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s';
        });
    });

    // 3D Tilt Effect for Profile Image
    const profileImage = document.querySelector('.about-img img');
    if (profileImage) {
        profileImage.parentElement.classList.add('tilt-wrapper');

        profileImage.parentElement.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const tiltX = (centerY - y) / 10;
            const tiltY = (x - centerX) / 10;

            profileImage.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
        });

        profileImage.parentElement.addEventListener('mouseleave', function () {
            profileImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    // 3D Rotating Skills Cube
    createSkillsCube();
});

// Function to create the 3D rotating skills cube
function createSkillsCube() {
    const skillsSection = document.querySelector('.skills-container');

    // Create cube container
    const cubeContainer = document.createElement('div');
    cubeContainer.className = 'cube-container';

    // Create the cube
    const cube = document.createElement('div');
    cube.className = 'cube';

    // Create cube faces
    const skills = ['HTML', 'CSS', 'JavaScript', 'Python', 'C++', 'ML'];
    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];

    faces.forEach((face, index) => {
        const cubeFace = document.createElement('div');
        cubeFace.className = `cube-face cube-face-${face}`;
        cubeFace.innerHTML = `<i class="skill-icon-3d ${getSkillIcon(skills[index])}"></i><span>${skills[index]}</span>`;
        cube.appendChild(cubeFace);
    });

    cubeContainer.appendChild(cube);

    // Add cube before the skills grid
    if (skillsSection && skillsSection.parentNode) {
        skillsSection.parentNode.insertBefore(cubeContainer, skillsSection);
    }

    // Rotate the cube on mousemove
    document.addEventListener('mousemove', function (e) {
        const rotateY = (e.clientX / window.innerWidth - 0.5) * 360;
        const rotateX = (e.clientY / window.innerHeight - 0.5) * 360;

        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
}

// Helper function to get Font Awesome icon classes based on skill name
function getSkillIcon(skill) {
    const icons = {
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'JavaScript': 'fab fa-js',
        'Python': 'fab fa-python',
        'C++': 'fas fa-code',
        'ML': 'fas fa-brain'
    };

    return icons[skill] || 'fas fa-code';
}
