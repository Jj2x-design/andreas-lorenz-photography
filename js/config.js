/**
 * CONFIGURATION FILE
 * ==================
 *
 * Add your albums and photos below.
 * Images are stored in the /images/albums/ folder.
 *
 * Image naming convention:
 * - Medium size (grid): 800px wide, suffix _m.jpg
 * - Large size (lightbox): 1920px wide, suffix _l.jpg
 *
 * Example folder structure:
 * /images/albums/
 *   landscapes/
 *     cover.jpg
 *     photo1_m.jpg
 *     photo1_l.jpg
 *     photo2_m.jpg
 *     photo2_l.jpg
 */

const CONFIG = {
    // Your name (displayed on the site)
    photographerName: 'Andreas Lorenz',

    // ===================
    // FLICKR SETTINGS (disabled - using local images)
    // ===================
    flickr: {
        enabled: false,
        username: '',
        userId: '',
        photoCount: 20
    },

    // ===================
    // YOUR PHOTO ALBUMS
    // ===================
    // Add your albums here. Each album needs:
    // - id: unique identifier
    // - title: display name
    // - coverImage: path to cover image
    // - photos: array of photo objects

    manualAlbums: [
        // EXAMPLE ALBUM - Replace with your own!
        {
            id: 'landscapes',
            title: 'Landscapes',
            description: 'Nature and scenic photography',
            coverImage: 'images/albums/landscapes/cover.jpg',
            photos: [
                {
                    id: 'landscape-1',
                    title: 'Mountain Sunrise',
                    url_medium: 'images/albums/landscapes/photo1_m.jpg',
                    url_large: 'images/albums/landscapes/photo1_l.jpg'
                },
                {
                    id: 'landscape-2',
                    title: 'Forest Path',
                    url_medium: 'images/albums/landscapes/photo2_m.jpg',
                    url_large: 'images/albums/landscapes/photo2_l.jpg'
                }
                // Add more photos here...
            ]
        },
        {
            id: 'portraits',
            title: 'Portraits',
            description: 'People and character studies',
            coverImage: 'images/albums/portraits/cover.jpg',
            photos: [
                {
                    id: 'portrait-1',
                    title: 'Portrait Study',
                    url_medium: 'images/albums/portraits/photo1_m.jpg',
                    url_large: 'images/albums/portraits/photo1_l.jpg'
                }
                // Add more photos here...
            ]
        }
        // Add more albums by copying the structure above
    ],

    // ===================
    // SITE SETTINGS
    // ===================
    site: {
        title: 'Andreas Lorenz Photography',
        tagline: 'photographer / visual storyteller (& dreamer)',
        email: 'hello@andreas-lorenz-photography.org',

        // About section text
        aboutLead: 'Every photograph is a conversation between light and shadow, between what was and what might be.',
        aboutText: [
            "I'm Andreas Lorenz, a photographer captivated by the poetry hidden in ordinary moments. My lens seeks the extraordinary within the everyday—the play of morning light through a window, the quiet dignity of weathered hands, the fleeting magic of golden hour.",
            "Photography, for me, is not just about capturing images. It's about distilling emotions, preserving memories, and telling stories that resonate beyond the frame."
        ]
    }
};

// Don't modify below this line
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
