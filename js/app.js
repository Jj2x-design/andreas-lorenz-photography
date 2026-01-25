/**
 * Andreas Lorenz Photography
 * Main Application Script
 */

(function() {
    'use strict';

    // State
    let currentAlbum = null;
    let currentPhotos = [];
    let currentPhotoIndex = 0;

    // DOM Elements
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
        lightboxNext: document.getElementById('lightbox-next')
    };

    // Initialize
    function init() {
        initTheme();
        initNavigation();
        initLightbox();
        loadCollections();
    }

    // ================================
    // THEME
    // ================================
    function initTheme() {
        // Check for saved theme or default to dark
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

    // ================================
    // NAVIGATION
    // ================================
    function initNavigation() {
        // Handle all navigation links and buttons
        document.querySelectorAll('[data-section]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = el.dataset.section;
                navigateTo(sectionId);
            });
        });

        // Back button in album view
        elements.backBtn?.addEventListener('click', showCollections);
    }

    function navigateTo(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.section === sectionId);
        });

        // Reset album view when navigating away from work
        if (sectionId !== 'work') {
            showCollections();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ================================
    // COLLECTIONS / GALLERY
    // ================================
    function loadCollections() {
        const albums = CONFIG.manualAlbums || [];

        if (albums.length === 0) {
            showEmptyState();
            return;
        }

        renderCollections(albums);
    }

    function renderCollections(albums) {
        if (!elements.collectionsGrid) return;

        elements.collectionsGrid.innerHTML = albums.map(album => `
            <article class="collection-card" data-album-id="${album.id}">
                <img src="${album.coverImage}" alt="${album.title}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 500%22%3E%3Crect fill=%22%23222%22 width=%22400%22 height=%22500%22/%3E%3Ctext x=%22200%22 y=%22250%22 text-anchor=%22middle%22 fill=%22%23666%22 font-family=%22sans-serif%22%3ENo Image%3C/text%3E%3C/svg%3E'">
                <div class="collection-info">
                    <h3 class="collection-name">${album.title}</h3>
                    <p class="collection-count">${album.photos?.length || 0} Photos</p>
                </div>
            </article>
        `).join('');

        // Add click handlers
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

        // Update title
        if (elements.albumTitle) {
            elements.albumTitle.textContent = album.title;
        }

        // Render photos
        if (elements.photosGrid) {
            elements.photosGrid.innerHTML = currentPhotos.map((photo, index) => `
                <div class="photo-item" data-index="${index}">
                    <img src="${photo.url_medium}" alt="${photo.title || ''}" loading="lazy">
                </div>
            `).join('');

            // Add click handlers for lightbox
            elements.photosGrid.querySelectorAll('.photo-item').forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.dataset.index, 10);
                    openLightbox(index);
                });
            });
        }

        // Show album view, hide collections
        if (elements.collectionsGrid) elements.collectionsGrid.style.display = 'none';
        if (elements.albumView) elements.albumView.classList.add('active');
    }

    function showCollections() {
        currentAlbum = null;
        currentPhotos = [];

        if (elements.collectionsGrid) elements.collectionsGrid.style.display = 'grid';
        if (elements.albumView) elements.albumView.classList.remove('active');
    }

    function showEmptyState() {
        if (!elements.collectionsGrid) return;

        elements.collectionsGrid.innerHTML = `
            <div class="loading-state">
                <p>No collections yet.</p>
                <p style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.7;">
                    Add your photos to the config.js file to get started.
                </p>
            </div>
        `;
    }

    // ================================
    // LIGHTBOX
    // ================================
    function initLightbox() {
        elements.lightboxClose?.addEventListener('click', closeLightbox);
        elements.lightboxPrev?.addEventListener('click', () => navigateLightbox(-1));
        elements.lightboxNext?.addEventListener('click', () => navigateLightbox(1));

        // Close on background click
        elements.lightbox?.addEventListener('click', (e) => {
            if (e.target === elements.lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!elements.lightbox?.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateLightbox(-1);
                    break;
                case 'ArrowRight':
                    navigateLightbox(1);
                    break;
            }
        });
    }

    function openLightbox(index) {
        currentPhotoIndex = index;
        const photo = currentPhotos[index];

        if (!photo || !elements.lightbox) return;

        elements.lightboxImg.src = photo.url_large || photo.url_medium;
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

        // Loop around
        if (newIndex < 0) newIndex = currentPhotos.length - 1;
        if (newIndex >= currentPhotos.length) newIndex = 0;

        openLightbox(newIndex);
    }

    // Start the app
    document.addEventListener('DOMContentLoaded', init);

})();
