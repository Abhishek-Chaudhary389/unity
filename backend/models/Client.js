import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Client name is required'],
            trim: true
        },
        sector: {
            type: String,
            default: 'Luxury Packaging Partner',
            trim: true
        },
        category: {
            type: String,
            default: 'corporate',
            trim: true
        },
        logoText: {
            type: String,
            default: '',
            trim: true
        },
        logoSub: {
            type: String,
            default: '',
            trim: true
        },
        logoInitial: {
            type: String,
            default: '',
            trim: true
        },
        badgeColor: {
            type: String,
            default: 'from-amber-600 to-yellow-500'
        },
        accentBg: {
            type: String,
            default: 'bg-amber-50 text-amber-800 border-amber-200'
        },
        partnershipYears: {
            type: String,
            default: '3+ Years Partner',
            trim: true
        },
        packagingVolume: {
            type: String,
            default: '500,000 Units / Year',
            trim: true
        },
        packagingImage: {
            type: String,
            default: ''
        },
        tagline: {
            type: String,
            default: '',
            trim: true
        },
        description: {
            type: String,
            default: '',
            trim: true
        },
        deliverables: {
            type: [String],
            default: []
        },
        testimonial: {
            type: String,
            default: '',
            trim: true
        },
        reviewer: {
            type: String,
            default: '',
            trim: true
        },
        reviewerRole: {
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

export const Client = mongoose.model('Client', clientSchema)
