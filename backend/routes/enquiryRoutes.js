import express from 'express'
import {
    createEnquiry,
    getEnquiries,
    updateEnquiryStatus,
    deleteEnquiry
} from '../controllers/enquiryController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public submission route
router.post('/', createEnquiry)

// Protected Admin management routes
router.get('/', protectAdmin, getEnquiries)
router.put('/:id', protectAdmin, updateEnquiryStatus)
router.delete('/:id', protectAdmin, deleteEnquiry)

export default router
