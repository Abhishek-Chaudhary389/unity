import express from 'express'
import {
    getClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
} from '../controllers/clientController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public read routes
router.get('/', getClients)
router.get('/:id', getClientById)

// Protected Admin management routes
router.post('/', protectAdmin, createClient)
router.put('/:id', protectAdmin, updateClient)
router.delete('/:id', protectAdmin, deleteClient)

export default router
