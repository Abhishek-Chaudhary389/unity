import { Product } from '../models/Product.js'
import { uploadToImageKit, isImageKitConfigured } from '../config/imagekit.js'

// @desc    Get all products (with optional filtering)
// @route   GET /api/products
export const getProducts = async (req, res) => {
    try {
        const { category, search, featured } = req.query
        const query = {}

        if (category && category !== 'all') {
            query.category = category
        }

        if (featured === 'true') {
            query.isFeatured = true
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { specs: { $regex: search, $options: 'i' } }
            ]
        }

        const products = await Product.find(query).sort({ createdAt: -1 })
        res.status(200).json({ success: true, count: products.length, data: products })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }
        res.status(200).json({ success: true, data: product })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// @desc    Create new product
// @route   POST /api/products
export const createProduct = async (req, res) => {
    try {
        let { title, category, categoryName, moq, image, description, specs, finishes, isFeatured } = req.body

        if (!title || !image) {
            return res.status(400).json({ success: false, message: 'Title and image are required' })
        }

        // Auto upload base64 images to ImageKit Cloud
        if (image.startsWith('data:image/') && isImageKitConfigured) {
            try {
                const ikRes = await uploadToImageKit(image, `product_${Date.now()}.jpg`, '/unity_products')
                image = ikRes.url
            } catch (ikErr) {
                console.warn('ImageKit auto-upload warning:', ikErr.message)
            }
        }

        const product = await Product.create({
            title,
            category: category || 'rigid',
            categoryName: categoryName || 'Rigid Boxes',
            moq: moq || '500 pcs',
            image,
            description: description || '',
            specs: specs || '',
            finishes: Array.isArray(finishes) ? finishes : typeof finishes === 'string' ? finishes.split(',').map(s => s.trim()).filter(Boolean) : [],
            isFeatured: !!isFeatured
        })

        res.status(201).json({ success: true, data: product, message: 'Product created successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

// @desc    Update product
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
    try {
        const { finishes, image, ...rest } = req.body
        const updateData = { ...rest }

        if (image) {
            let finalImage = image
            if (image.startsWith('data:image/') && isImageKitConfigured) {
                try {
                    const ikRes = await uploadToImageKit(image, `product_${Date.now()}.jpg`, '/unity_products')
                    finalImage = ikRes.url
                } catch (ikErr) {
                    console.warn('ImageKit auto-upload warning:', ikErr.message)
                }
            }
            updateData.image = finalImage
        }

        if (finishes !== undefined) {
            updateData.finishes = Array.isArray(finishes) ? finishes : typeof finishes === 'string' ? finishes.split(',').map(s => s.trim()).filter(Boolean) : []
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        })

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }

        res.status(200).json({ success: true, data: product, message: 'Product updated successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

// @desc    Delete product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
