import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = path.resolve('uploads')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase()
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        cb(null, `img-${uniqueSuffix}${ext}`)
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|svg/
    const mimeMatch = allowed.test(file.mimetype)
    const extMatch = allowed.test(path.extname(file.originalname).toLowerCase())

    if (mimeMatch && extMatch) {
        cb(null, true)
    } else {
        cb(new Error('Only image files (JPEG, PNG, WEBP, GIF, SVG) are allowed!'), false)
    }
}

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max limit
    fileFilter
})
