#!/usr/bin/env python3
"""
Generate config.js from album folders with EXIF date sorting.
"""

import os
import json
import unicodedata
from PIL import Image
from PIL.ExifTags import TAGS
from datetime import datetime

ALBUMS_DIR = 'images/albums'

ALBUM_META = {
    'alps':       {'title': 'Alps',       'description': 'Alpine landscapes'},
    'animals':    {'title': 'Animals',    'description': 'Wildlife photography'},
    'bavaria':    {'title': 'Bavaria',    'description': 'Bavaria, Germany'},
    'chile':      {'title': 'Chile',      'description': 'Santiago and beyond'},
    'fireworks':  {'title': 'Fireworks',  'description': 'National Day celebrations'},
    'indonesia':  {'title': 'Indonesia',  'description': 'Nusa Penida and Batam'},
    'malaysia':   {'title': 'Malaysia',   'description': 'Kuala Lumpur and Johor'},
    'metro':      {'title': 'Metro',      'description': 'Underground stations around the world'},
    'nepal':      {'title': 'Nepal',      'description': 'Himalayan adventures'},
    'singapore':  {'title': 'Singapore',  'description': 'The Lion City'},
    'spain':      {'title': 'Spain',      'description': 'Barcelona and Catalonia'},
}

ALBUM_ORDER = [
    'singapore', 'alps', 'nepal', 'metro', 'animals',
    'fireworks', 'spain', 'chile', 'malaysia', 'indonesia', 'bavaria'
]

def get_exif_date(filepath):
    """Extract DateTimeOriginal from EXIF, returns datetime or None."""
    try:
        img = Image.open(filepath)
        exif_data = img._getexif()
        if not exif_data:
            return None
        for tag_id, value in exif_data.items():
            tag = TAGS.get(tag_id, tag_id)
            if tag == 'DateTimeOriginal':
                # Format: "2021:01:15 10:23:45"
                return datetime.strptime(value, '%Y:%m:%d %H:%M:%S')
        # Fall back to DateTime
        for tag_id, value in exif_data.items():
            tag = TAGS.get(tag_id, tag_id)
            if tag == 'DateTime':
                return datetime.strptime(value, '%Y:%m:%d %H:%M:%S')
    except Exception:
        pass
    return None

def format_date(dt):
    """Format datetime as '15th January 2021'."""
    if dt is None:
        return None
    day = dt.day
    if 11 <= day <= 13:
        suffix = 'th'
    else:
        suffix = {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th')
    return f"{day}{suffix} {dt.strftime('%B %Y')}"

def scan_album(album_id):
    """Return list of photo dicts sorted by EXIF date."""
    folder = os.path.join(ALBUMS_DIR, album_id)
    photos = []

    for filename in sorted(unicodedata.normalize('NFC', f) for f in os.listdir(folder)):
        if not filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue
        filepath = os.path.join(folder, filename)
        dt = get_exif_date(filepath)
        date_str = format_date(dt)
        # Title: filename without extension
        title = os.path.splitext(filename)[0]
        url = f'{ALBUMS_DIR}/{album_id}/{filename}'
        photos.append({
            'title': title,
            'url_medium': url,
            'url_large': url,
            'date': date_str,
            '_dt': dt,
        })

    # Sort by date (None dates go last, then maintain filename order)
    photos.sort(key=lambda p: (p['_dt'] is None, p['_dt'] or datetime.min))

    # Assign IDs and remove temp sort key
    prefix = album_id[:2]
    for i, p in enumerate(photos, 1):
        p['id'] = f'{prefix}{i}'
        del p['_dt']

    return photos

def pick_cover(photos, album_id):
    """Pick cover image - most recent dated photo, or last photo."""
    dated = [p for p in photos if p.get('date')]
    if dated:
        return dated[-1]['url_medium']
    return photos[-1]['url_medium'] if photos else ''

def js_value(v):
    """Convert Python value to JS literal."""
    if v is None:
        return 'null'
    return json.dumps(v, ensure_ascii=False)

def generate_config():
    albums_js = []

    for album_id in ALBUM_ORDER:
        if album_id not in ALBUM_META:
            continue
        folder = os.path.join(ALBUMS_DIR, album_id)
        if not os.path.isdir(folder):
            print(f'  WARNING: folder not found: {folder}')
            continue

        meta = ALBUM_META[album_id]
        print(f'  Scanning {album_id}...')
        photos = scan_album(album_id)
        if not photos:
            print(f'    No photos found, skipping.')
            continue

        cover = pick_cover(photos, album_id)

        photos_js_lines = []
        for p in photos:
            date_val = js_value(p.get('date'))
            line = (
                f"                {{ id: {js_value(p['id'])}, "
                f"title: {js_value(p['title'])}, "
                f"url_medium: {js_value(p['url_medium'])}, "
                f"url_large: {js_value(p['url_large'])}, "
                f"date: {date_val} }}"
            )
            photos_js_lines.append(line)

        newline = ',\n'
        photos_js = newline.join(photos_js_lines)

        album_js = f"""        {{
            id: {js_value(album_id)},
            title: {js_value(meta['title'])},
            description: {js_value(meta['description'])},
            coverImage: {js_value(cover)},
            photos: [
{photos_js}
            ]
        }}"""
        albums_js.append(album_js)

        dated = sum(1 for p in photos if p.get('date'))
        print(f'    {len(photos)} photos, {dated} with EXIF dates')

    albums_joined = ',\n'.join(albums_js)
    config_content = f"""/**
 * PORTFOLIO CONFIGURATION
 * Auto-generated by generate-config.py — do not edit manually.
 */

const CONFIG = {{
    manualAlbums: [
{albums_joined}
    ]
}};
"""
    with open('js/config.js', 'w', encoding='utf-8') as f:
        f.write(config_content)
    print('\nWrote js/config.js')

if __name__ == '__main__':
    print('Scanning albums...')
    generate_config()
