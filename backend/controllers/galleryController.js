import { Gallery } from '../models/Gallery.js'

// @desc    Get all gallery photos
// @route   GET /api/gallery
export const getGallery = async (req, res) => {
    try {
        const { category } = req.query
        const query = {}
        if (category && category !== 'all') {
            query.category = category
        }

        const photos = await Gallery.find(query).sort({ createdAt: -1 })
        res.status(200).json({ success: true, count: photos.length, data: photos })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// @desc    Add photo to gallery
// @route   POST /api/gallery
export const createGalleryPhoto = async (req, res) => {
    try {
        const { title, category, url } = req.body

        if (!url) {
            return res.status(400).json({ success: false, message: 'Image URL is required' })
        }

        const photo = await Gallery.create({
            title: title || 'Packaging Showcase Item',
            category: category || 'Rigid Boxes',
            url
        })

        res.status(201).json({ success: true, data: photo, message: 'Photo added to gallery successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

// @desc    Delete gallery photo
// @route   DELETE /api/gallery/:id
export const deleteGalleryPhoto = async (req, res) => {
    try {
        const photo = await Gallery.findByIdAndDelete(req.params.id)
        if (!photo) {
            return res.status(404).json({ success: false, message: 'Gallery item not found' })
        }
        res.status(200).json({ success: true, message: 'Gallery item deleted successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
