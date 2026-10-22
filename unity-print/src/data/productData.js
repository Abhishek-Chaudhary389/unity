// Initial default packaging products for Unity Print Pack Solutions
export const initialProducts = [
    {
        id: 'prod-1',
        title: 'Luxury Rigid Magnetic Gift Box',
        category: 'rigid',
        categoryName: 'Rigid Boxes',
        moq: '500 pcs',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
        description: 'Handcrafted with 2.0mm high-density Kappa greyboard wrapped in imported soft-touch art paper. Concealed magnetic closure with laser-cut velvet EVA foam insert.',
        specs: '2.0mm Greyboard • 157 GSM Art Paper • Magnetic Flap',
        finishes: ['Gold Foil Stamping', 'Spot UV', 'Soft-Touch Matte'],
        isFeatured: true,
    },
    {
        id: 'prod-2',
        title: 'Corrugated E-Commerce Shipping Mailer',
        category: 'corrugated',
        categoryName: 'Corrugated Mailers',
        moq: '500 pcs',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',
        description: 'High crush-resistance 3-ply and 5-ply fluted corrugated boxes with vibrant inside-out full color offset print and self-locking dust flaps.',
        specs: 'E-Flute / B-Flute Corrugated • Double-Wall Side Wings',
        finishes: ['Full Inside Print', 'Aqueous Coating', 'Peel-and-Seal Tape'],
        isFeatured: true,
    },
    {
        id: 'prod-3',
        title: 'Boutique Kraft Paper Shopping Bag',
        category: 'paper-bags',
        categoryName: 'Paper Bags',
        moq: '1,000 pcs',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop',
        description: '100% biodegradable virgin brown kraft paper bags with heavy-load reinforced bottom cardboards and twisted paper or braided cotton rope handles.',
        specs: '220 - 300 GSM Virgin Kraft • Reinforced Bottom Board',
        finishes: ['Pantone Spot Color', 'Twisted Rope Handle', 'Turnover Top'],
        isFeatured: true,
    },
    {
        id: 'prod-4',
        title: 'Waterproof Product Labels & Roll Stickers',
        category: 'labels',
        categoryName: 'Labels & Stickers',
        moq: '1,000 pcs',
        image: 'https://images.unsplash.com/photo-1608248597359-25081e7d5d78?q=80&w=1000&auto=format&fit=crop',
        description: 'High-definition waterproof, oil-resistant and scratch-proof roll stickers on metallic foil, clear vinyl, and textured kraft paper for jars and bottles.',
        specs: 'Chrome BOPP / Transparent PET • Machine Application Rolls',
        finishes: ['Cold Foil Metallic', 'Matte UV Varnish', 'Custom Contour Cut'],
        isFeatured: false,
    },
    {
        id: 'prod-5',
        title: 'Folding Mono Cartons & Sleeves',
        category: 'cartons',
        categoryName: 'Folding Cartons',
        moq: '2,500 pcs',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
        description: 'Lightweight folding paperboard boxes for pharmaceuticals, cosmetics, and food retail shelves. Auto-lock bottom and clear PET display windows.',
        specs: '300 - 400 GSM Cyber SBS Board • Food-Grade Soy Inks',
        finishes: ['Drip-Off Matte & Gloss', 'Clear PET Window', 'Braille Emboss'],
        isFeatured: false,
    },
    {
        id: 'prod-6',
        title: 'Corporate Catalogues & Brand Brochures',
        category: 'print',
        categoryName: 'Commercial Print',
        moq: '500 pcs',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop',
        description: 'High-GSM corporate product catalogues, multi-fold marketing brochures, and presentation books with strict Heidelberg color fidelity.',
        specs: '170 - 350 GSM Art Card • Perfect Thermal / Saddle Stitch',
        finishes: ['Thermal Velvet Lamination', 'Scodix 3D UV', 'Gatefold Covers'],
        isFeatured: true,
    },
    {
        id: 'prod-7',
        title: 'Shoulder Neck Rigid Jewelry Box',
        category: 'rigid',
        categoryName: 'Rigid Boxes',
        moq: '500 pcs',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
        description: 'Three-piece luxury shoulder and neck box with contrasting metallic inner neck. Precision die-cut slots for rings, necklaces, and delicate luxury items.',
        specs: '2.5mm Greyboard • Gold Mirror Card Neck • Velvet Insert',
        finishes: ['Rose Gold Hot Foil', 'Matte Anti-Scratch Film', 'Debossed Logo'],
        isFeatured: false,
    },
    {
        id: 'prod-8',
        title: 'Clear Window Food & Bakery Box',
        category: 'cartons',
        categoryName: 'Folding Cartons',
        moq: '1,000 pcs',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
        description: 'Food-safe certified folding cartons with anti-grease coating and crystal-clear top display window for pastries, sweets, and gourmet confectionery.',
        specs: '350 GSM Food-Grade Bleached Board • Heat-Sealed PET Film',
        finishes: ['Grease-Resistant Barrier', 'Easy-Lock Corners', 'Window Patch'],
        isFeatured: false,
    },
]

export const productCategories = [
    { id: 'all', name: 'All Products' },
    { id: 'rigid', name: 'Rigid Boxes' },
    { id: 'corrugated', name: 'Corrugated Mailers' },
    { id: 'paper-bags', name: 'Paper Bags' },
    { id: 'labels', name: 'Labels & Stickers' },
    { id: 'cartons', name: 'Folding Cartons' },
    { id: 'print', name: 'Commercial Print' },
]

const STORAGE_KEY = 'unity_print_pack_products'

// Helper to get products from localStorage or fall back to defaults
export function getStoredProducts() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed
            }
        }
    } catch (e) {
        console.error('Failed to read products from localStorage', e)
    }
    return initialProducts
}

// Helper to save products to localStorage
export function saveStoredProducts(products) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    } catch (e) {
        console.error('Failed to save products to localStorage', e)
    }
}

// Reset products to defaults
export function resetToDefaultProducts() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts))
    } catch (e) {
        console.error('Failed to reset products', e)
    }
    return initialProducts
}
