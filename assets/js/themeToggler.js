document.addEventListener('DOMContentLoaded', function () {
    console.log('🎨 Theme toggler loading...');
    
    // Get theme toggle buttons
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const navbar = document.getElementById('navbar');
    
    // Function to set the theme
    function setTheme(theme) {
        console.log(`🎨 Setting theme to: ${theme}`);
        
        // Set the theme attribute
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (navbar) {
            navbar.setAttribute('data-theme', theme);
            
            // Force navbar styling refresh
            if (theme === 'dark') {
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        }
        
        // Update button icons for both toggles
        updateToggleIcons(theme);
        
        // Force a repaint
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
        
        console.log(`✅ Theme set to ${theme}`);
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
    
    // Initialize theme - always default to dark unless explicitly set to light
    if (savedTheme === 'light') {
        setTheme('light');
    } else {
        setTheme('dark');
    }

    // Toggle theme function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        console.log(`🔄 Toggling theme from ${currentTheme} to ${newTheme}`);
        setTheme(newTheme);
    }

    // Add event listeners to theme toggle buttons
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        console.log('✅ Desktop theme toggle connected');
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
        console.log('✅ Mobile theme toggle connected');
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
        if (navbar && navbar.getAttribute('data-theme') !== currentTheme) {
            navbar.setAttribute('data-theme', currentTheme);
        }
    });
    
    console.log('🎨 Theme toggler initialized successfully');
});
