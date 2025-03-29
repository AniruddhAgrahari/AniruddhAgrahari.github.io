document.addEventListener('DOMContentLoaded', function () {
    // Get theme toggle buttons
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const navbar = document.getElementById('navbar');

    // Function to set the theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        navbar.setAttribute('data-theme', theme);

        // Update button icons for both toggles
        updateToggleIcons(theme);
    }

    function updateToggleIcons(theme) {
        // Update icons for both desktop and mobile toggles
        const moonIcons = document.querySelectorAll('.fa-moon');
        const sunIcons = document.querySelectorAll('.fa-sun');

        if (theme === 'dark') {
            moonIcons.forEach(icon => icon.style.display = 'none');
            sunIcons.forEach(icon => icon.style.display = 'block');
        } else {
            moonIcons.forEach(icon => icon.style.display = 'block');
            sunIcons.forEach(icon => icon.style.display = 'none');
        }
    }

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Initialize theme
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Toggle theme function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    // Add event listeners to theme toggle buttons
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Additional mobile optimizations
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // Fix parallax on mobile dynamically
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.style.backgroundAttachment = window.innerWidth <= 768 ? 'scroll' : 'fixed';
        }
    });

    // Fix for mobile 100vh issue
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.style.height = 'calc(var(--vh, 1vh) * 100)';
        // Initialize parallax setting
        heroSection.style.backgroundAttachment = window.innerWidth <= 768 ? 'scroll' : 'fixed';
    }

    // Track scrolling to ensure navbar theme persists
    window.addEventListener('scroll', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (navbar.getAttribute('data-theme') !== currentTheme) {
            navbar.setAttribute('data-theme', currentTheme);
        }
    });
});
