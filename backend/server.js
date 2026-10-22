import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB, getDbStatus } from './config/db.js'
import { Admin } from './models/Admin.js'

// Routes
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import enquiryRoutes from './routes/enquiryRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ extended: true, limit: '25mb' }))

// Serve uploaded static images
const uploadsPath = path.resolve('uploads')
app.use('/uploads', express.static(uploadsPath))

// Ensure Default Admin Exists
const ensureDefaultAdmin = async () => {
    try {
        const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@unityprint.com'
        const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123'
        const existing = await Admin.findOne({ email: adminEmail.toLowerCase() })

        if (!existing) {
            await Admin.create({
                name: 'Unity Administrator',
                email: adminEmail,
                password: adminPassword,
                role: 'superadmin'
            })
            console.log(`🔑 Default Admin initialized: ${adminEmail} (password: ${adminPassword})`)
        }
    } catch (err) {
        console.error('⚠️ Could not initialize default admin:', err.message)
    }
}

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/upload', uploadRoutes)

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Unity Print Pack Solutions Backend API is running smoothly 🚀',
        databaseConnected: getDbStatus(),
        timestamp: new Date().toISOString()
    })
})

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` })
})

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Server Error:', err)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    })
})

// Start server
app.listen(PORT, async () => {
    console.log(`🚀 Unity Server running on http://localhost:${PORT}`)
    console.log(`📦 Health Check: http://localhost:${PORT}/api/health`)
    
    // Connect to database
    await connectDB()
    if (getDbStatus()) {
        await ensureDefaultAdmin()
    }
})
