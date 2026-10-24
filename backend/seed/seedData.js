import dotenv from 'dotenv'
import path from 'path'
import dns from 'dns'
import mongoose from 'mongoose'
import { Product } from '../models/Product.js'
import { Gallery } from '../models/Gallery.js'
import { Client } from '../models/Client.js'
import { Admin } from '../models/Admin.js'

try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])
} catch (e) {}

dotenv.config({ path: path.resolve('.env') })

// Initial Products Data
const initialProducts = [
    {
        title: 'Luxury Rigid Magnetic Gift Box',
        category: 'rigid',
        categoryName: 'Rigid Boxes',
        moq: '500 pcs',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
        description: 'Handcrafted with 2.0mm high-density Kappa greyboard wrapped in imported soft-touch art paper. Concealed magnetic closure with laser-cut velvet EVA foam insert.',
        specs: '2.0mm Greyboard • 157 GSM Art Paper • Magnetic Flap',
        finishes: ['Gold Foil Stamping', 'Spot UV', 'Soft-Touch Matte'],
        isFeatured: true
    },
    {
        title: 'Corrugated E-Commerce Shipping Mailer',
        category: 'corrugated',
        categoryName: 'Corrugated Mailers',
        moq: '500 pcs',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',
        description: 'High crush-resistance 3-ply and 5-ply fluted corrugated boxes with vibrant inside-out full color offset print and self-locking dust flaps.',
        specs: 'E-Flute / B-Flute Corrugated • Double-Wall Side Wings',
        finishes: ['Full Inside Print', 'Aqueous Coating', 'Peel-and-Seal Tape'],
        isFeatured: true
    },
    {
        title: 'Custom Food & Cookie Folding Cartons',
        category: 'cartons',
        categoryName: 'Folding Cartons',
        moq: '1,000 pcs',
        image: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774632176_Clipboard_03-28-2025_06_wdxm6CVZK.webp?updatedAt=1792774634411',
        description: 'Premium food-grade paperboard folding cartons engineered for bakery, cookies, confectionery, and FMCG products with vibrant multi-color offset print.',
        specs: '300 - 400 GSM FBB / ITC Board • Auto-Lock Bottom',
        finishes: ['Gloss / Matte UV Coating', 'Food-Safe Inks', 'Crash-Lock'],
        isFeatured: true
    },
    {
        title: 'Hospital & Institutional Case File Folders',
        category: 'print',
        categoryName: 'Commercial Print',
        moq: '500 pcs',
        image: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774748654_File_02__JuIQOKyM.webp?updatedAt=1792774751480',
        description: 'Heavy-duty laminated medical case file folders and institutional document holders with custom multi-pocket die-cutting, patient record charts, and tear-resistant creased spine.',
        specs: '300 - 350 GSM Art Card • Reinforced Creased Spine',
        finishes: ['Gloss / Matte Thermal Lamination', 'Die-Cut Inner Pockets', 'Bilingual Print'],
        isFeatured: true
    },
    {
        title: 'Folding Mono Cartons & Sleeves',
        category: 'cartons',
        categoryName: 'Folding Cartons',
        moq: '2,500 pcs',
        image: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792772080690_Clipboard_03-28-2025_01_UzRNQNrvW.webp?updatedAt=1792772083109',
        description: 'Lightweight folding paperboard boxes for pharmaceuticals, cosmetics, and food retail shelves. Auto-lock bottom and clear PET display windows.',
        specs: '300 - 400 GSM Cyber SBS Board • Food-Grade Soy Inks',
        finishes: ['Drip-Off Matte & Gloss', 'Clear PET Window', 'Braille Emboss'],
        isFeatured: true
    }
]

// Initial Gallery Photos Data
const initialGalleryPhotos = [
    {
        title: 'Luxury Velvet Rigid Box',
        category: 'Rigid Boxes',
        url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop'
    },
    {
        title: 'Corrugated E-Commerce Mailer',
        category: 'Mailers',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop'
    },
    {
        title: 'Qoot Jeera Cookies Folding Carton',
        category: 'Cartons',
        url: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774632176_Clipboard_03-28-2025_06_wdxm6CVZK.webp?updatedAt=1792774634411'
    },
    {
        title: 'Cosmetics Folding Cartons',
        category: 'Cartons',
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop'
    },
    {
        title: 'Shoulder Neck Jewelry Box',
        category: 'Rigid Boxes',
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop'
    },
    {
        title: 'Bhagawati Hospital Medical File Folder',
        category: 'Print',
        url: 'https://ik.imagekit.io/vbzl5fzbj/unity_packaging/1792774748654_File_02__JuIQOKyM.webp?updatedAt=1792774751480'
    }
]

// Initial Clients Data
const initialClients = [
    {
        name: 'Royal Heritage Confectionery',
        sector: 'Luxury Food & Sweets',
        category: 'food',
        logoText: 'ROYAL HERITAGE',
        logoSub: 'FINE ARTISAN CONFECTIONERY',
        logoInitial: 'RH',
        badgeColor: 'from-amber-600 to-yellow-500',
        accentBg: 'bg-amber-50 text-amber-800 border-amber-200',
        partnershipYears: '6+ Years Partner',
        packagingVolume: '1.2 Million Boxes / Year',
        packagingImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
        tagline: 'Premium Festive Sweets & Artisanal Mithai Boxes',
        description: 'Unity Print Pack engineers custom multi-compartment rigid gift boxes manufactured from 2.0mm high-density Kappa greyboard with gold foil stamped filigree and soft-touch velvet laminations.',
        deliverables: [
            'Magnetic Flap Rigid Boxes',
            'Gold & Bronze Foil Hot Stamping',
            'Food-Grade Greaseproof Liners',
            'Custom Velvet Cavity Inserts'
        ],
        testimonial: 'Unity Print Pack transformed our festive presentation. The structural precision and metallic gold hot stamping give our mithai gift boxes an unmatched royal touch on store shelves.',
        reviewer: 'Vikramaditya Singhania',
        reviewerRole: 'Head of Brand Packaging, Royal Heritage'
    },
    {
        name: 'Aura Botanicals & Skincare',
        sector: 'Cosmetics & Personal Care',
        category: 'cosmetics',
        logoText: 'AURA BOTANICALS',
        logoSub: 'ORGANIC DERMA CARE',
        logoInitial: 'AB',
        badgeColor: 'from-emerald-600 to-teal-500',
        accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        partnershipYears: '4+ Years Partner',
        packagingVolume: '850,000 Units / Year',
        packagingImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
        tagline: 'Eco-Luxury Serum Bottles & Cosmetic Mono Cartons',
        description: 'Engineered on FSC-certified 350 GSM Cyber SBS folding board, we manufacture lightweight folding cartons featuring drip-off matte effects, spot UV textures, and holographic tamper-evident seals.',
        deliverables: [
            'FSC-Certified Mono Cartons',
            'Drip-Off Matte & Gloss Contrast',
            'Holographic Security Labels',
            'Auto-Lock Safety Crash Bottom'
        ],
        testimonial: 'Color consistency across our entire skincare line is critical. Unity’s Heidelberg 6-color printing press maintains exact Pantone fidelity order after order.',
        reviewer: 'Dr. Tanya Sehgal',
        reviewerRole: 'Co-Founder & R&D Lead, Aura Botanicals'
    }
]

async function seed() {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/unity_print'
        await mongoose.connect(uri)
        console.log('🌱 Connected to MongoDB for seeding...')

        // Seed Admin if not exists
        const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@unityprint.com'
        const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123'
        const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() })

        if (!existingAdmin) {
            await Admin.create({
                name: 'Unity Admin Master',
                email: adminEmail,
                password: adminPassword,
                role: 'superadmin'
            })
            console.log(`👤 Created default admin: ${adminEmail} / ${adminPassword}`)
        } else {
            console.log(`ℹ️ Admin (${adminEmail}) already exists.`)
        }

        // Seed Products if collection empty
        const prodCount = await Product.countDocuments()
        if (prodCount === 0) {
            await Product.insertMany(initialProducts)
            console.log(`📦 Seeded ${initialProducts.length} default packaging products!`)
        } else {
            console.log(`ℹ️ Products collection already has ${prodCount} items.`)
        }

        // Seed Gallery if collection empty
        const galleryCount = await Gallery.countDocuments()
        if (galleryCount === 0) {
            await Gallery.insertMany(initialGalleryPhotos)
            console.log(`🖼️ Seeded ${initialGalleryPhotos.length} default gallery photos!`)
        } else {
            console.log(`ℹ️ Gallery collection already has ${galleryCount} items.`)
        }

        // Seed Clients if collection empty
        const clientCount = await Client.countDocuments()
        if (clientCount === 0) {
            await Client.insertMany(initialClients)
            console.log(`🤝 Seeded ${initialClients.length} default corporate clients!`)
        } else {
            console.log(`ℹ️ Clients collection already has ${clientCount} items.`)
        }

        console.log('✅ Seeding process completed successfully!')
        process.exit(0)
    } catch (err) {
        console.error('❌ Error during seeding:', err)
        process.exit(1)
    }
}

seed()
