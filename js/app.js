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
        collectionsGrid: document.getElementById('collections-grid'),
        albumView: document.getElementById('album-view'),
        albumTitle: document.getElementById('album-title'),
        photosGrid: document.getElementById('photos-grid'),
        backBtn: document.getElementById('back-btn'),
        lightbox: document.getElementById('lightbox'),
        lightboxImg: document.getElementById('lightbox-img'),
        lightboxCaption: document.getElementById('lightbox-caption'),
        lightboxClose: document.getElementById('lightbox-close'),
        lightboxPrev: document.getElementById('lightbox-prev'),
        lightboxNext: document.getElementById('lightbox-next'),
        collectionsSection: document.querySelector('.collections-section'),
        hero: document.querySelector('.hero')
    };

    function init() {
        initTheme();
        initNavigation();
        initLightbox();
        loadCollections();
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

    // Navigation
    function initNavigation() {
        document.querySelectorAll('[data-section]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = el.dataset.section;
                navigateTo(sectionId);
            });
        });

        elements.backBtn?.addEventListener('click', showCollections);
    }

    function navigateTo(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.section === sectionId);
        });

        if (sectionId === 'home') {
            showCollections();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            const photoCount = album.photos?.length || 0;

            return `
                <article class="collection-card" data-album-id="${album.id}">
                    <img src="${coverPath}" alt="${album.title}" loading="lazy">
                    <div class="collection-info">
                        <h3 class="collection-name">${album.title}</h3>
                        <p class="collection-count">${photoCount} Photos</p>
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

    function openAlbum(album) {
        currentAlbum = album;
        currentPhotos = album.photos || [];

        if (elements.albumTitle) {
            elements.albumTitle.textContent = album.title;
        }

        if (elements.photosGrid) {
            elements.photosGrid.innerHTML = currentPhotos.map((photo, index) => {
                const imgPath = encodePath(photo.url_medium);
                return `
                    <div class="photo-item" data-index="${index}">
                        <img src="${imgPath}" alt="${photo.title || ''}" loading="lazy">
                    </div>
                `;
            }).join('');

            elements.photosGrid.querySelectorAll('.photo-item').forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.dataset.index, 10);
                    openLightbox(index);
                });
            });
        }

        // Hide hero and collections, show album view
        if (elements.hero) elements.hero.style.display = 'none';
        if (elements.collectionsSection) elements.collectionsSection.style.display = 'none';
        if (elements.albumView) elements.albumView.classList.add('active');
    }

    function showCollections() {
        currentAlbum = null;
        currentPhotos = [];

        if (elements.hero) elements.hero.style.display = 'block';
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
