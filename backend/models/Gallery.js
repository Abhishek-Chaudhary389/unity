import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: 'Packaging Showcase Item',
            trim: true
        },
        category: {
            type: String,
            default: 'Rigid Boxes',
            trim: true
        },
        url: {
            type: String,
            required: [true, 'Gallery image URL or path is required']
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

export const Gallery = mongoose.model('Gallery', gallerySchema)
