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
        title: 'Custom Food & Cookie Folding Cartons',
        category: 'cartons',
        categoryName: 'Folding Cartons',
        moq: '1,000 pcs',
        image: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774632176_Clipboard_03-28-2025_06_wdxm6CVZK.webp?updatedAt=1792774634411',
        description: 'Premium food-grade paperboard folding cartons engineered for bakery, cookies, confectionery, and FMCG products with vibrant multi-color offset print.',
        specs: '300 - 400 GSM FBB / ITC Board • Auto-Lock Bottom',
        finishes: ['Gloss / Matte UV Coating', 'Food-Safe Inks', 'Crash-Lock'],
        isFeatured: true,
    },
    {
        id: 'prod-4',
        title: 'Hospital & Institutional Case File Folders',
        category: 'print',
        categoryName: 'Commercial Print',
        moq: '500 pcs',
        image: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774748654_File_02__JuIQOKyM.webp?updatedAt=1792774751480',
        description: 'Heavy-duty laminated medical case file folders and institutional document holders with custom multi-pocket die-cutting, patient record charts, and tear-resistant creased spine.',
        specs: '300 - 350 GSM Art Card • Reinforced Creased Spine',
        finishes: ['Gloss / Matte Thermal Lamination', 'Die-Cut Inner Pockets', 'Bilingual Print'],
        isFeatured: true,
    },
    {
        id: 'prod-5',
        title: 'Promotional Marketing Flyers & Festival Leaflets',
        category: 'print',
        categoryName: 'Commercial Print',
        moq: '1,000 pcs',
        image: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774736960_8b926310-88f1-46b5-b10d-bcb3ca84cb12_rnTp_Wu0w.webp?updatedAt=1792774738841',
        description: 'High-resolution promotional flyers, sales pamphlets, and festival marketing inserts printed with high-speed Heidelberg offset press calibration on premium art paper.',
        specs: '130 - 250 GSM Gloss / Matt Art Paper • CMYK Offset',
        finishes: ['Gloss / Silk-Matte Coating', 'Crisp Fold Lines', 'Vibrant Color Match'],
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
        title: 'Retail Shelf Packaging & Confectionery Cartons',
        category: 'cartons',
        categoryName: 'Folding Cartons',
        moq: '1,000 pcs',
        image: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792772080690_Clipboard_03-28-2025_01_UzRNQNrvW.webp?updatedAt=1792772083109',
        description: 'Eye-catching branded confectionery and snack retail boxes crafted from premium Cyber XL PAC board for maximum shelf appeal, structural rigidity, and unboxing appeal.',
        specs: 'Cyber XL PAC / Virgin Board • Auto-Lock Base',
        finishes: ['Drip Off / Spot UV', 'Custom Window Patching', 'Vivid Brand Colors'],
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
