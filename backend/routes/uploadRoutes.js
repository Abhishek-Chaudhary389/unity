import express from 'express'
import { upload } from '../middleware/uploadMiddleware.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc    Upload single image
// @route   POST /api/upload
router.post('/', protectAdmin, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image file uploaded' })
        }

        // Return relative or full URL
        const protocol = req.protocol
        const host = req.get('host')
        const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`

        res.status(200).json({
            success: true,
            filename: req.file.filename,
            url: fileUrl,
            message: 'Image uploaded successfully'
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

export default router
