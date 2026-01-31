/**
 * Andreas Lorenz Photography
 */

(function() {
    'use strict';

    let currentAlbum = null;
    let currentPhotos = [];
    let currentPhotoIndex = 0;

    const elements = {
        themeToggle: document.getElementById('theme-toggle'),
        menuToggle: document.getElementById('menu-toggle'),
        menuOverlay: document.getElementById('menu-overlay'),
        menuLinks: document.getElementById('menu-links'),
        menuAboutLink: document.getElementById('menu-about-link'),
        logoLink: document.getElementById('logo-link'),
        collectionsSection: document.getElementById('collections-section'),
        collectionsGrid: document.getElementById('collections-grid'),
        albumView: document.getElementById('album-view'),
        albumTitle: document.getElementById('album-title'),
        backBtn: document.getElementById('back-btn'),
        galleryMainImg: document.getElementById('gallery-main-img'),
        galleryCaption: document.getElementById('gallery-caption'),
        galleryPrev: document.getElementById('gallery-prev'),
        galleryNext: document.getElementById('gallery-next'),
        filmstrip: document.getElementById('filmstrip'),
        lightbox: document.getElementById('lightbox'),
        lightboxImg: document.getElementById('lightbox-img'),
        lightboxCaption: document.getElementById('lightbox-caption'),
        lightboxClose: document.getElementById('lightbox-close'),
        lightboxPrev: document.getElementById('lightbox-prev'),
        lightboxNext: document.getElementById('lightbox-next')
    };

    function init() {
        initTheme();
        initMenu();
        initGallery();
        initLightbox();
        loadCollections();
        initNavigation();
    }

    // Theme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        elements.themeToggle?.addEventListener('click', toggleTheme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Menu
    function initMenu() {
        elements.menuToggle?.addEventListener('click', toggleMenu);

        // Close menu when clicking overlay background
        elements.menuOverlay?.addEventListener('click', (e) => {
            if (e.target === elements.menuOverlay) {
                closeMenu();
            }
        });

        // About link in menu
        elements.menuAboutLink?.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        });

        // Populate menu with album links
        const albums = CONFIG?.manualAlbums || [];
        if (elements.menuLinks) {
            elements.menuLinks.innerHTML = albums.map(album =>
                `<li><a href="#" class="menu-link" data-album-id="${album.id}">${album.title}</a></li>`
            ).join('');

            elements.menuLinks.querySelectorAll('.menu-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const albumId = link.dataset.albumId;
                    const album = albums.find(a => a.id === albumId);
                    if (album) {
                        closeMenu();
                        openAlbum(album);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
            });
        }
    }

    function toggleMenu() {
        const isOpen = elements.menuOverlay?.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        elements.menuOverlay?.classList.add('active');
        elements.menuToggle?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        elements.menuOverlay?.classList.remove('active');
        elements.menuToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Navigation
    function initNavigation() {
        elements.logoLink?.addEventListener('click', (e) => {
            e.preventDefault();
            showCollections();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        elements.backBtn?.addEventListener('click', showCollections);
    }

    // Encode path for URLs with special characters
    function encodePath(path) {
        return path.split('/').map(segment => encodeURIComponent(segment)).join('/');
    }

    // Collections
    function loadCollections() {
        const albums = CONFIG?.manualAlbums || [];

        if (albums.length === 0) {
            if (elements.collectionsGrid) {
                elements.collectionsGrid.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center; padding: 2rem;">No collections yet.</p>';
            }
            return;
        }

        renderCollections(albums);
    }

    function renderCollections(albums) {
        if (!elements.collectionsGrid) return;

        elements.collectionsGrid.innerHTML = albums.map(album => {
            const coverPath = encodePath(album.coverImage);

            return `
                <article class="collection-card" data-album-id="${album.id}">
                    <img src="${coverPath}" alt="${album.title}" loading="lazy">
                    <div class="collection-info">
                        <h3 class="collection-name">${album.title}</h3>
                    </div>
                </article>
            `;
        }).join('');

        elements.collectionsGrid.querySelectorAll('.collection-card').forEach(card => {
            card.addEventListener('click', () => {
                const albumId = card.dataset.albumId;
                const album = albums.find(a => a.id === albumId);
                if (album) openAlbum(album);
            });
        });
    }

    // Gallery
    function initGallery() {
        elements.galleryPrev?.addEventListener('click', () => navigateGallery(-1));
        elements.galleryNext?.addEventListener('click', () => navigateGallery(1));

        // Click main image to open lightbox
        elements.galleryMainImg?.addEventListener('click', () => {
            openLightbox(currentPhotoIndex);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!elements.albumView?.classList.contains('active')) return;
            if (elements.lightbox?.classList.contains('active')) return;

            switch (e.key) {
                case 'ArrowLeft': navigateGallery(-1); break;
                case 'ArrowRight': navigateGallery(1); break;
            }
        });
    }

    function navigateGallery(direction) {
        let newIndex = currentPhotoIndex + direction;
        if (newIndex < 0) newIndex = currentPhotos.length - 1;
        if (newIndex >= currentPhotos.length) newIndex = 0;
        showGalleryPhoto(newIndex);
    }

    function showGalleryPhoto(index) {
        currentPhotoIndex = index;
        const photo = currentPhotos[index];
        if (!photo) return;

        const imgPath = encodePath(photo.url_large || photo.url_medium);
        elements.galleryMainImg.src = imgPath;
        elements.galleryMainImg.alt = photo.title || 'Photo';
        elements.galleryCaption.textContent = photo.title || '';

        // Update filmstrip active state
        elements.filmstrip?.querySelectorAll('.filmstrip-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        // Scroll filmstrip to show active item
        const activeThumb = elements.filmstrip?.querySelector('.filmstrip-item.active');
        if (activeThumb) {
            activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }

    function openAlbum(album) {
        currentAlbum = album;
        currentPhotos = album.photos || [];
        currentPhotoIndex = 0;

        if (elements.albumTitle) {
            elements.albumTitle.textContent = album.title;
        }

        // Render filmstrip
        if (elements.filmstrip) {
            elements.filmstrip.innerHTML = currentPhotos.map((photo, index) => {
                const imgPath = encodePath(photo.url_medium);
                return `
                    <div class="filmstrip-item${index === 0 ? ' active' : ''}" data-index="${index}">
                        <img src="${imgPath}" alt="${photo.title || ''}" loading="lazy">
                    </div>
                `;
            }).join('');

            elements.filmstrip.querySelectorAll('.filmstrip-item').forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.dataset.index, 10);
                    showGalleryPhoto(index);
                });
            });
        }

        // Show first photo
        showGalleryPhoto(0);

        // Hide collections, show album view
        if (elements.collectionsSection) elements.collectionsSection.style.display = 'none';
        if (elements.albumView) elements.albumView.classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showCollections() {
        currentAlbum = null;
        currentPhotos = [];

        if (elements.collectionsSection) elements.collectionsSection.style.display = 'block';
        if (elements.albumView) elements.albumView.classList.remove('active');
    }

    // Lightbox
    function initLightbox() {
        elements.lightboxClose?.addEventListener('click', closeLightbox);
        elements.lightboxPrev?.addEventListener('click', () => navigateLightbox(-1));
        elements.lightboxNext?.addEventListener('click', () => navigateLightbox(1));

        elements.lightbox?.addEventListener('click', (e) => {
            if (e.target === elements.lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!elements.lightbox?.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape': closeLightbox(); break;
                case 'ArrowLeft': navigateLightbox(-1); break;
                case 'ArrowRight': navigateLightbox(1); break;
            }
        });
    }

    function openLightbox(index) {
        currentPhotoIndex = index;
        const photo = currentPhotos[index];

        if (!photo || !elements.lightbox) return;

        const imgPath = encodePath(photo.url_large || photo.url_medium);
        elements.lightboxImg.src = imgPath;
        elements.lightboxImg.alt = photo.title || 'Photo';
        elements.lightboxCaption.textContent = photo.title || '';

        elements.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!elements.lightbox) return;
        elements.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        let newIndex = currentPhotoIndex + direction;
        if (newIndex < 0) newIndex = currentPhotos.length - 1;
        if (newIndex >= currentPhotos.length) newIndex = 0;
        openLightbox(newIndex);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
