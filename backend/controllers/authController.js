import jwt from 'jsonwebtoken'
import { Admin } from '../models/Admin.js'

const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET || 'unity_print_secret_key', {
        expiresIn: '7d'
    })
}

// @desc    Admin login
// @route   POST /api/auth/login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' })
        }

        const admin = await Admin.findOne({ email: email.toLowerCase() })
        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }

        const isMatch = await admin.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }

        const token = generateToken(admin._id, admin.email)

        res.status(200).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            },
            message: 'Login successful'
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// @desc    Get current authenticated Admin
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password')
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' })
        }
        res.status(200).json({ success: true, admin })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
