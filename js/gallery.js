/**
 * Gallery Module
 * Handles album display, photo grids, and lightbox
 */

const Gallery = {
    albums: [],
    currentAlbum: null,
    currentPhotoIndex: 0,
    currentPhotos: [],

    /**
     * Initialize the gallery
     */
    async init() {
        this.bindEvents();
        await this.loadAlbums();
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Back button
        const backBtn = document.getElementById('back-to-albums');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showAlbumsGrid());
        }

        // Lightbox events
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLightbox());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateLightbox(-1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateLightbox(1));
        }

        // Close lightbox on background click
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.navigateLightbox(-1);
                    break;
                case 'ArrowRight':
                    this.navigateLightbox(1);
                    break;
            }
        });
    },

    /**
     * Load albums from Flickr and manual config
     */
    async loadAlbums() {
        const albumsGrid = document.getElementById('albums-grid');
        if (!albumsGrid) return;

        this.albums = [];

        try {
            // Load from Flickr if enabled
            if (CONFIG.flickr.enabled && CONFIG.flickr.username !== 'YOUR_FLICKR_USERNAME') {
                const userId = CONFIG.flickr.userId || null;
                const photos = await FlickrService.fetchPublicPhotos(userId);

                if (photos.length > 0) {
                    // Create a single album from recent photos
                    const recentAlbum = FlickrService.createVirtualAlbum(photos, 'Recent Work');
                    this.albums.push(recentAlbum);

                    // Also show a preview in hero section
                    this.setHeroPreview(photos[0]);
                }
            }

            // Add manual albums
            if (CONFIG.manualAlbums && CONFIG.manualAlbums.length > 0) {
                this.albums = [...this.albums, ...CONFIG.manualAlbums];
            }

            // Render albums
            this.renderAlbums();

        } catch (error) {
            console.error('Error loading albums:', error);
            this.showError(albumsGrid, 'Unable to load photos. Please check your configuration.');
        }
    },

    /**
     * Set hero section preview image
     */
    setHeroPreview(photo) {
        const heroPreview = document.getElementById('hero-preview');
        if (heroPreview && photo) {
            const img = document.createElement('img');
            img.src = photo.url_medium;
            img.alt = photo.title || 'Featured photo';
            img.loading = 'lazy';
            heroPreview.appendChild(img);
        }
    },

    /**
     * Render albums grid
     */
    renderAlbums() {
        const albumsGrid = document.getElementById('albums-grid');
        if (!albumsGrid) return;

        if (this.albums.length === 0) {
            this.showEmptyState(albumsGrid);
            return;
        }

        albumsGrid.innerHTML = '';

        this.albums.forEach((album, index) => {
            const card = this.createAlbumCard(album, index);
            albumsGrid.appendChild(card);
        });
    },

    /**
     * Create album card element
     */
    createAlbumCard(album, index) {
        const card = document.createElement('div');
        card.className = 'album-card';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="album-cover">
                <img src="${album.coverImage}" alt="${album.title}" loading="lazy">
            </div>
            <div class="album-info">
                <h3 class="album-name">${album.title}</h3>
                <span class="album-count">${album.photoCount || album.photos?.length || 0} photos</span>
                <div class="album-deco"></div>
            </div>
        `;

        card.addEventListener('click', () => this.openAlbum(album));

        return card;
    },

    /**
     * Open an album and show its photos
     */
    openAlbum(album) {
        this.currentAlbum = album;
        this.currentPhotos = album.photos || [];

        const albumsGrid = document.getElementById('albums-grid');
        const albumView = document.getElementById('album-view');
        const albumTitle = document.getElementById('album-title');
        const photosGrid = document.getElementById('photos-grid');

        if (albumsGrid) albumsGrid.style.display = 'none';
        if (albumView) albumView.classList.add('active');
        if (albumTitle) albumTitle.textContent = album.title;

        if (photosGrid) {
            photosGrid.innerHTML = '';
            this.currentPhotos.forEach((photo, index) => {
                const item = this.createPhotoItem(photo, index);
                photosGrid.appendChild(item);
            });
        }

        // Scroll to top of section
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    },

    /**
     * Create photo grid item
     */
    createPhotoItem(photo, index) {
        const item = document.createElement('div');
        item.className = 'photo-item';

        // Add variety to grid layout
        if (index % 5 === 0) item.classList.add('wide');
        if (index % 7 === 0) item.classList.add('tall');

        item.innerHTML = `
            <img src="${photo.url_medium}" alt="${photo.title || 'Photo'}" loading="lazy">
            <div class="photo-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                    <path d="M11 8v6M8 11h6"/>
                </svg>
            </div>
        `;

        item.addEventListener('click', () => this.openLightbox(index));

        return item;
    },

    /**
     * Show albums grid (hide album view)
     */
    showAlbumsGrid() {
        const albumsGrid = document.getElementById('albums-grid');
        const albumView = document.getElementById('album-view');

        if (albumsGrid) albumsGrid.style.display = 'grid';
        if (albumView) albumView.classList.remove('active');

        this.currentAlbum = null;
    },

    /**
     * Open lightbox with photo
     */
    openLightbox(index) {
        this.currentPhotoIndex = index;
        const lightbox = document.getElementById('lightbox');
        const img = document.getElementById('lightbox-img');
        const caption = document.getElementById('lightbox-caption');

        const photo = this.currentPhotos[index];
        if (!photo) return;

        if (img) {
            img.src = photo.url_large || photo.url_original || photo.url_medium;
            img.alt = photo.title || 'Photo';
        }

        if (caption) {
            caption.textContent = photo.title || '';
        }

        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    /**
     * Close lightbox
     */
    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    /**
     * Navigate lightbox
     */
    navigateLightbox(direction) {
        const newIndex = this.currentPhotoIndex + direction;

        if (newIndex >= 0 && newIndex < this.currentPhotos.length) {
            this.openLightbox(newIndex);
        } else if (newIndex < 0) {
            this.openLightbox(this.currentPhotos.length - 1);
        } else {
            this.openLightbox(0);
        }
    },

    /**
     * Show empty state
     */
    showEmptyState(container) {
        container.innerHTML = `
            <div class="loading-state">
                <p>No albums found.</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">
                    Configure your Flickr username in <code>js/config.js</code>
                </p>
            </div>
        `;
    },

    /**
     * Show error state
     */
    showError(container, message) {
        container.innerHTML = `
            <div class="loading-state">
                <p style="color: #c0392b;">${message}</p>
            </div>
        `;
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Gallery;
}
