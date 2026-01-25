/**
 * PORTFOLIO CONFIGURATION
 * =======================
 *
 * HOW TO ADD YOUR PHOTOS:
 *
 * 1. Export photos from Lightroom Classic:
 *    - Select photos in a collection
 *    - File > Export
 *    - Export to: images/albums/[collection-name]/
 *    - Create two sizes:
 *      - Medium (for grid): 1200px long edge, quality 80%
 *      - Large (for lightbox): 2400px long edge, quality 85%
 *    - Name files: photo1.jpg, photo2.jpg, etc.
 *
 * 2. Add the collection below following the example format
 *
 * 3. Commit and push to GitHub
 */

const CONFIG = {
    // Your collections/albums
    manualAlbums: [
        // ============================================
        // EXAMPLE COLLECTION - Replace with your own!
        // ============================================
        {
            id: 'landscapes',
            title: 'Landscapes',
            description: 'Nature and scenic photography',
            // Cover image for the collection card
            coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
            // Photos in this collection
            photos: [
                {
                    id: 'l1',
                    title: 'Mountain Dawn',
                    url_medium: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
                    url_large: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85'
                },
                {
                    id: 'l2',
                    title: 'Forest Path',
                    url_medium: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
                    url_large: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=85'
                },
                {
                    id: 'l3',
                    title: 'Ocean Sunset',
                    url_medium: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
                    url_large: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85'
                },
                {
                    id: 'l4',
                    title: 'Desert Dunes',
                    url_medium: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
                    url_large: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=85'
                }
            ]
        },
        {
            id: 'portraits',
            title: 'Portraits',
            description: 'People and character studies',
            coverImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
            photos: [
                {
                    id: 'p1',
                    title: 'Natural Light',
                    url_medium: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
                    url_large: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1920&q=85'
                },
                {
                    id: 'p2',
                    title: 'Street Portrait',
                    url_medium: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
                    url_large: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=85'
                },
                {
                    id: 'p3',
                    title: 'Golden Hour',
                    url_medium: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
                    url_large: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&q=85'
                }
            ]
        },
        {
            id: 'urban',
            title: 'Urban',
            description: 'City life and architecture',
            coverImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
            photos: [
                {
                    id: 'u1',
                    title: 'City Lights',
                    url_medium: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
                    url_large: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=85'
                },
                {
                    id: 'u2',
                    title: 'Architecture',
                    url_medium: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
                    url_large: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85'
                },
                {
                    id: 'u3',
                    title: 'Night Street',
                    url_medium: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
                    url_large: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=85'
                },
                {
                    id: 'u4',
                    title: 'Reflections',
                    url_medium: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
                    url_large: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=85'
                },
                {
                    id: 'u5',
                    title: 'Subway',
                    url_medium: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80',
                    url_large: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920&q=85'
                }
            ]
        }

        // ============================================
        // ADD YOUR OWN COLLECTIONS BELOW
        // ============================================
        // Copy the structure above and replace with your images:
        /*
        {
            id: 'my-collection',
            title: 'My Collection',
            description: 'Description here',
            coverImage: 'images/albums/my-collection/cover.jpg',
            photos: [
                {
                    id: 'my1',
                    title: 'Photo Title',
                    url_medium: 'images/albums/my-collection/photo1.jpg',
                    url_large: 'images/albums/my-collection/photo1_large.jpg'
                }
            ]
        }
        */
    ]
};
