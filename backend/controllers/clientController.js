import { Client } from '../models/Client.js'
import { uploadToImageKit, isImageKitConfigured } from '../config/imagekit.js'

// @desc    Get all clients
// @route   GET /api/clients
export const getClients = async (req, res) => {
    try {
        const { category } = req.query
        const query = {}
        if (category && category !== 'all') {
            query.category = category
        }

        const clients = await Client.find(query).sort({ createdAt: -1 })
        res.status(200).json({ success: true, count: clients.length, data: clients })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// @desc    Get single client
// @route   GET /api/clients/:id
export const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id)
        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' })
        }
        res.status(200).json({ success: true, data: client })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// @desc    Create new client
// @route   POST /api/clients
export const createClient = async (req, res) => {
    try {
        let {
            name,
            sector,
            category,
            logoText,
            logoSub,
            logoInitial,
            badgeColor,
            accentBg,
            partnershipYears,
            packagingVolume,
            packagingImage,
            tagline,
            description,
            deliverables,
            testimonial,
            reviewer,
            reviewerRole
        } = req.body

        if (!name) {
            return res.status(400).json({ success: false, message: 'Client name is required' })
        }

        // Auto upload base64 image to ImageKit Cloud
        if (packagingImage && packagingImage.startsWith('data:image/') && isImageKitConfigured) {
            try {
                const ikRes = await uploadToImageKit(packagingImage, `client_${Date.now()}.jpg`, '/unity_clients')
                packagingImage = ikRes.url
            } catch (ikErr) {
                console.warn('ImageKit client upload warning:', ikErr.message)
            }
        }

        const client = await Client.create({
            name,
            sector: sector || 'Luxury Food & Sweets',
            category: category || 'food',
            logoText: logoText || name.toUpperCase(),
            logoSub: logoSub || 'PARTNER BRAND',
            logoInitial: logoInitial || name.slice(0, 2).toUpperCase(),
            badgeColor: badgeColor || 'from-amber-600 to-yellow-500',
            accentBg: accentBg || 'bg-amber-50 text-amber-800 border-amber-200',
            partnershipYears: partnershipYears || '3+ Years Partner',
            packagingVolume: packagingVolume || '500,000 Units / Year',
            packagingImage: packagingImage || '',
            tagline: tagline || '',
            description: description || '',
            deliverables: Array.isArray(deliverables) ? deliverables : typeof deliverables === 'string' ? deliverables.split(',').map(s => s.trim()).filter(Boolean) : [],
            testimonial: testimonial || '',
            reviewer: reviewer || '',
            reviewerRole: reviewerRole || ''
        })

        res.status(201).json({ success: true, data: client, message: 'Client created successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

// @desc    Update client
// @route   PUT /api/clients/:id
export const updateClient = async (req, res) => {
    try {
        const { deliverables, packagingImage, ...rest } = req.body
        const updateData = { ...rest }

        if (packagingImage) {
            let finalImage = packagingImage
            if (packagingImage.startsWith('data:image/') && isImageKitConfigured) {
                try {
                    const ikRes = await uploadToImageKit(packagingImage, `client_${Date.now()}.jpg`, '/unity_clients')
                    finalImage = ikRes.url
                } catch (ikErr) {
                    console.warn('ImageKit client upload warning:', ikErr.message)
                }
            }
            updateData.packagingImage = finalImage
        }

        if (deliverables !== undefined) {
            updateData.deliverables = Array.isArray(deliverables) ? deliverables : typeof deliverables === 'string' ? deliverables.split(',').map(s => s.trim()).filter(Boolean) : []
        }

        const client = await Client.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        })

        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' })
        }

        res.status(200).json({ success: true, data: client, message: 'Client updated successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

// @desc    Delete client
// @route   DELETE /api/clients/:id
export const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id)
        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' })
        }
        res.status(200).json({ success: true, message: 'Client deleted successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
