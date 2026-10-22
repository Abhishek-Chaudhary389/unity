import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true
        },
        companyName: {
            type: String,
            default: '',
            trim: true
        },
        phone: {
            type: String,
            required: [true, 'Contact phone number is required'],
            trim: true
        },
        quantity: {
            type: String,
            default: '1,000 pcs',
            trim: true
        },
        message: {
            type: String,
            default: '',
            trim: true
        },
        productName: {
            type: String,
            default: '',
            trim: true
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'in-production', 'completed', 'cancelled'],
            default: 'new'
        },
        adminNotes: {
            type: String,
            default: '',
            trim: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id.toString()
                delete ret.__v
                return ret
            }
        }
    }
)

export const Enquiry = mongoose.model('Enquiry', enquirySchema)
