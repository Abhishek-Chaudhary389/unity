import express from 'express'
import {
    getGallery,
    createGalleryPhoto,
    deleteGalleryPhoto
} from '../controllers/galleryController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public read route
router.get('/', getGallery)

// Protected Admin management routes
router.post('/', protectAdmin, createGalleryPhoto)
router.delete('/:id', protectAdmin, deleteGalleryPhoto)

export default router
