import { Enquiry } from '../models/Enquiry.js'

// @desc    Submit new order / contact enquiry
// @route   POST /api/enquiries
export const createEnquiry = async (req, res) => {
    try {
        const { fullName, companyName, phone, quantity, message, productName } = req.body

        if (!fullName || !phone) {
            return res.status(400).json({ success: false, message: 'Name and phone number are required' })
        }

        const enquiry = await Enquiry.create({
            fullName,
            companyName: companyName || '',
            phone,
            quantity: quantity || '1,000 pcs',
            message: message || '',
            productName: productName || ''
        })

        res.status(201).json({
            success: true,
            data: enquiry,
            message: 'Enquiry received successfully! Our packaging specialist will contact you.'
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

// @desc    Get all enquiries (Admin only)
// @route   GET /api/enquiries
export const getEnquiries = async (req, res) => {
    try {
        const { status } = req.query
        const query = {}
        if (status && status !== 'all') {
            query.status = status
        }

        const enquiries = await Enquiry.find(query).sort({ createdAt: -1 })
        res.status(200).json({ success: true, count: enquiries.length, data: enquiries })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// @desc    Update enquiry status / notes (Admin only)
// @route   PUT /api/enquiries/:id
export const updateEnquiryStatus = async (req, res) => {
    try {
        const { status, adminNotes } = req.body
        const updateData = {}
        if (status) updateData.status = status
        if (adminNotes !== undefined) updateData.adminNotes = adminNotes

        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        })

        if (!enquiry) {
            return res.status(404).json({ success: false, message: 'Enquiry not found' })
        }

        res.status(200).json({ success: true, data: enquiry, message: 'Enquiry updated successfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

// @desc    Delete enquiry (Admin only)
// @route   DELETE /api/enquiries/:id
export const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id)
        if (!enquiry) {
            return res.status(404).json({ success: false, message: 'Enquiry not found' })
        }
        res.status(200).json({ success: true, message: 'Enquiry deleted successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
