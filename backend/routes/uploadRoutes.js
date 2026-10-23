import express from 'express'
import { upload } from '../middleware/uploadMiddleware.js'
import { protectAdmin } from '../middleware/authMiddleware.js'
import imagekit, { uploadToImageKit, isImageKitConfigured } from '../config/imagekit.js'

const router = express.Router()

// @desc    Upload single image to ImageKit Cloud
// @route   POST /api/upload
router.post('/', protectAdmin, upload.single('image'), async (req, res) => {
    try {
        // 1. If file uploaded via multipart form
        if (req.file) {
            if (isImageKitConfigured && imagekit) {
                const cleanName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')
                const uniqueFileName = `${Date.now()}_${cleanName}`

                const result = await uploadToImageKit(
                    req.file.buffer,
                    uniqueFileName,
                    '/unity_packaging'
                )

                return res.status(200).json({
                    success: true,
                    url: result.url,
                    thumbnailUrl: result.thumbnailUrl,
                    fileId: result.fileId,
                    provider: 'ImageKit',
                    message: 'Image uploaded to ImageKit Cloud successfully 🚀'
                })
            }
        }

        // 2. If base64 image passed in body (e.g. { imageBase64: 'data:image/...', fileName: '...' })
        if (req.body && req.body.imageBase64) {
            if (isImageKitConfigured && imagekit) {
                const fileName = req.body.fileName || `upload_${Date.now()}.jpg`
                const result = await uploadToImageKit(
                    req.body.imageBase64,
                    fileName,
                    '/unity_packaging'
                )

                return res.status(200).json({
                    success: true,
                    url: result.url,
                    thumbnailUrl: result.thumbnailUrl,
                    fileId: result.fileId,
                    provider: 'ImageKit',
                    message: 'Image uploaded to ImageKit Cloud successfully 🚀'
                })
            }
        }

        return res.status(400).json({
            success: false,
            message: 'No image file or imageBase64 provided'
        })
    } catch (error) {
        console.error('Upload Error:', error)
        res.status(500).json({
            success: false,
            message: error.message || 'Image upload failed'
        })
    }
})

// @desc    Get ImageKit client-side auth parameters (optional for client-side uploads)
// @route   GET /api/upload/auth
router.get('/auth', (req, res) => {
    if (!isImageKitConfigured || !imagekit) {
        return res.status(500).json({ success: false, message: 'ImageKit is not configured' })
    }
    const authParams = imagekit.getAuthenticationParameters()
    res.status(200).json({ success: true, ...authParams })
})

export default router
