document.addEventListener('DOMContentLoaded', function () {
    // More reliable GitHub Pages detection
    const isGitHubPages =
        window.location.hostname.includes('github.io') ||
        window.location.hostname.includes('githubapp.com');

    if (!isGitHubPages) {
        console.log('Not running on GitHub Pages, skipping path fixes');
        return; // Exit if not on GitHub Pages
    }

    console.log('GitHub Pages detected, applying fixes...');

    // Get repository name from URL (more reliable method)
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const repoName = pathSegments[0] || '';
    const baseUrl = repoName ? `/${repoName}/` : '/';

    console.log(`Detected repo name: ${repoName}, baseUrl: ${baseUrl}`);

    // Add base element to head for resolving relative URLs
    const baseTag = document.createElement('base');
    baseTag.href = window.location.origin + baseUrl;
    document.head.prepend(baseTag);
    console.log(`Added base tag: ${baseTag.href}`);

    // Fix CSS references
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('./')) {
            link.href = href.replace('./', baseUrl);
            console.log(`Fixed CSS: ${href} -> ${link.href}`);
        } else if (href && !href.includes('//')) { // Local file without ./ prefix
            if (!href.startsWith('/')) {
                link.href = baseUrl + href;
                console.log(`Fixed CSS: ${href} -> ${link.href}`);
            }
        }
    });

    // Fix script references
    document.querySelectorAll('script').forEach(script => {
        if (!script.src || script.src.includes('//')) return; // Skip inline or absolute URLs

        const src = script.getAttribute('src');
        if (src && src.startsWith('./')) {
            script.src = src.replace('./', baseUrl);
            console.log(`Fixed script: ${src} -> ${script.src}`);
        } else if (src && !src.startsWith('/')) {
            script.src = baseUrl + src;
            console.log(`Fixed script: ${src} -> ${script.src}`);
        }
    });

    // Fix image sources
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (!src || src.includes('//')) return; // Skip if no src or is absolute URL

        if (src.startsWith('./')) {
            img.src = src.replace('./', baseUrl);
            console.log(`Fixed image: ${src} -> ${img.src}`);
        } else if (!src.startsWith('/')) {
            img.src = baseUrl + src;
            console.log(`Fixed image: ${src} -> ${img.src}`);
        } else if (src.startsWith('/') && !src.startsWith(baseUrl)) {
            img.src = baseUrl + src.substring(1);
            console.log(`Fixed image: ${src} -> ${img.src}`);
        }
    });

    // Fix background images in inline styles
    document.querySelectorAll('[style*="background-image"]').forEach(el => {
        const style = el.getAttribute('style');
        if (!style) return;

        const bgImgMatch = style.match(/url\(['"]?([^'"*)]+)['"]?\)/);
        if (bgImgMatch && bgImgMatch[1] && !bgImgMatch[1].includes('//')) {
            const imgPath = bgImgMatch[1];
            let newPath;

            if (imgPath.startsWith('./')) {
                newPath = imgPath.replace('./', baseUrl);
            } else if (!imgPath.startsWith('/')) {
                newPath = baseUrl + imgPath;
            } else if (imgPath.startsWith('/') && !imgPath.startsWith(baseUrl)) {
                newPath = baseUrl + imgPath.substring(1);
            } else {
                return;
            }

            const newStyle = style.replace(imgPath, newPath);
            el.setAttribute('style', newStyle);
            console.log(`Fixed bg image: ${imgPath} -> ${newPath}`);
        }
    });

    console.log('GitHub Pages path fixes complete');
});
