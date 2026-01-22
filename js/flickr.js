/**
 * Flickr Integration (No API Key Required)
 * Uses Flickr's public JSON feed
 */

const FlickrService = {
    // Flickr public feed URL
    feedUrl: 'https://api.flickr.com/services/feeds/photos_public.gne',

    /**
     * Fetch photos from Flickr public feed
     * @param {string} userId - Flickr user ID (optional if username is provided)
     * @returns {Promise<Array>} Array of photo objects
     */
    async fetchPublicPhotos(userId) {
        return new Promise((resolve, reject) => {
            // Create unique callback name
            const callbackName = 'flickrCallback_' + Date.now();

            // Build URL with JSONP
            const params = new URLSearchParams({
                format: 'json',
                jsoncallback: callbackName
            });

            if (userId) {
                params.append('id', userId);
            }

            const url = `${this.feedUrl}?${params.toString()}`;

            // Create script element for JSONP
            const script = document.createElement('script');
            script.src = url;

            // Set up callback
            window[callbackName] = (data) => {
                // Clean up
                delete window[callbackName];
                document.body.removeChild(script);

                if (data && data.items) {
                    const photos = data.items.map((item, index) => ({
                        id: `flickr-${index}-${Date.now()}`,
                        title: item.title || 'Untitled',
                        description: item.description || '',
                        url_small: item.media.m,
                        url_medium: item.media.m.replace('_m.', '_z.'),
                        url_large: item.media.m.replace('_m.', '_b.'),
                        url_original: item.media.m.replace('_m.', '_b.'),
                        link: item.link,
                        dateTaken: item.date_taken,
                        author: item.author_id
                    }));
                    resolve(photos);
                } else {
                    resolve([]);
                }
            };

            // Handle errors
            script.onerror = () => {
                delete window[callbackName];
                document.body.removeChild(script);
                reject(new Error('Failed to fetch Flickr photos'));
            };

            // Add script to page
            document.body.appendChild(script);

            // Timeout after 10 seconds
            setTimeout(() => {
                if (window[callbackName]) {
                    delete window[callbackName];
                    if (script.parentNode) {
                        document.body.removeChild(script);
                    }
                    reject(new Error('Flickr request timed out'));
                }
            }, 10000);
        });
    },

    /**
     * Look up user ID from username using public feed
     * Note: This is a workaround since we don't have API access
     * @param {string} username - Flickr username
     * @returns {Promise<string|null>} User ID or null
     */
    async findUserByUsername(username) {
        // Without API access, we can try the public feed with tags
        // This is limited but can work for some cases
        console.log(`Looking for user: ${username}`);
        console.log('Note: For best results, find your User ID from your Flickr profile URL');
        return null;
    },

    /**
     * Create a virtual album from recent photos
     * @param {Array} photos - Array of photos
     * @param {string} title - Album title
     * @returns {Object} Album object
     */
    createVirtualAlbum(photos, title = 'Recent Work') {
        return {
            id: 'flickr-recent',
            title: title,
            description: 'Latest photographs',
            coverImage: photos[0]?.url_medium || '',
            photoCount: photos.length,
            photos: photos
        };
    },

    /**
     * Group photos by date for virtual albums
     * @param {Array} photos - Array of photos
     * @returns {Array} Array of album objects
     */
    groupPhotosByDate(photos) {
        const groups = {};

        photos.forEach(photo => {
            if (photo.dateTaken) {
                const date = new Date(photo.dateTaken);
                const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                const monthName = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

                if (!groups[yearMonth]) {
                    groups[yearMonth] = {
                        id: `date-${yearMonth}`,
                        title: monthName,
                        description: `Photos from ${monthName}`,
                        photos: []
                    };
                }
                groups[yearMonth].photos.push(photo);
            }
        });

        // Convert to array and set cover images
        return Object.values(groups)
            .map(album => ({
                ...album,
                coverImage: album.photos[0]?.url_medium || '',
                photoCount: album.photos.length
            }))
            .sort((a, b) => b.id.localeCompare(a.id));
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FlickrService;
}
