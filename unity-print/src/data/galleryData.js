// Initial default gallery photos for Unity Print Pack Solutions
export const defaultGalleryPhotos = [
    {
        id: 'photo-1',
        title: 'Luxury Velvet Rigid Box',
        category: 'Rigid Boxes',
        url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'photo-2',
        title: 'Corrugated E-Commerce Mailer',
        category: 'Mailers',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'photo-3',
        title: 'Qoot Jeera Cookies Folding Carton',
        category: 'Cartons',
        url: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774632176_Clipboard_03-28-2025_06_wdxm6CVZK.webp?updatedAt=1792774634411'
    },
    {
        id: 'photo-4',
        title: 'Cosmetics Folding Cartons',
        category: 'Cartons',
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'photo-5',
        title: 'Shoulder Neck Jewelry Box',
        category: 'Rigid Boxes',
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'photo-6',
        title: 'Bhagawati Hospital Medical File Folder',
        category: 'Print',
        url: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774748654_File_02__JuIQOKyM.webp?updatedAt=1792774751480'
    },
    {
        id: 'photo-7',
        title: 'Bakery Window Display Box',
        category: 'Cartons',
        url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'photo-8',
        title: 'Glamio Beauty Hub Festive Flyer Print',
        category: 'Print',
        url: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774736960_8b926310-88f1-46b5-b10d-bcb3ca84cb12_rnTp_Wu0w.webp?updatedAt=1792774738841'
    },
    {
        id: 'photo-9',
        title: 'Artisan Gourmet Gift Packaging',
        category: 'Rigid Boxes',
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'photo-10',
        title: 'Qoot Badam Cookies Packaging Carton',
        category: 'Cartons',
        url: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792772080690_Clipboard_03-28-2025_01_UzRNQNrvW.webp?updatedAt=1792772083109'
    },
    {
        id: 'photo-11',
        title: 'Eco-Friendly Kraft Packaging',
        category: 'Paper Bags',
        url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop'
    },
    {
        id: 'photo-12',
        title: 'Custom Die-Cut Retail Sleeves',
        category: 'Cartons',
        url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=1200&auto=format&fit=crop'
    }
]

export const GALLERY_STORAGE_KEY = 'unity_gallery_photos'

export function getStoredGalleryPhotos() {
    try {
        const saved = localStorage.getItem(GALLERY_STORAGE_KEY)
        if (saved) {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed
            }
        }
    } catch (e) {
        console.error('Failed to load gallery photos', e)
    }
    return defaultGalleryPhotos
}

export function saveStoredGalleryPhotos(updatedList) {
    try {
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updatedList))
    } catch (e) {
        console.error('Failed to save gallery photos', e)
    }
}

export function resetToDefaultGalleryPhotos() {
    try {
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(defaultGalleryPhotos))
    } catch (e) {
        console.error('Failed to reset gallery photos', e)
    }
    return defaultGalleryPhotos
}
