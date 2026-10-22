import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: 'Unity Admin',
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Admin email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        role: {
            type: String,
            default: 'admin'
        }
    },
    {
        timestamps: true
    }
)

// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (err) {
        next(err)
    }
})

// Compare password method
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

export const Admin = mongoose.model('Admin', adminSchema)
