import express from 'express'
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public read routes
router.get('/', getProducts)
router.get('/:id', getProductById)

// Protected Admin management routes
router.post('/', protectAdmin, createProduct)
router.put('/:id', protectAdmin, updateProduct)
router.delete('/:id', protectAdmin, deleteProduct)

export default router
