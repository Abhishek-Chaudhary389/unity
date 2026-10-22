import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Product title is required'],
            trim: true
        },
        category: {
            type: String,
            required: [true, 'Category identifier is required'],
            default: 'rigid',
            trim: true
        },
        categoryName: {
            type: String,
            default: 'Rigid Boxes',
            trim: true
        },
        moq: {
            type: String,
            default: '500 pcs',
            trim: true
        },
        image: {
            type: String,
            required: [true, 'Product image URL or data is required']
        },
        description: {
            type: String,
            default: '',
            trim: true
        },
        specs: {
            type: String,
            default: '',
            trim: true
        },
        finishes: {
            type: [String],
            default: []
        },
        isFeatured: {
            type: Boolean,
            default: false
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

export const Product = mongoose.model('Product', productSchema)
