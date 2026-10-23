import multer from 'multer'
import path from 'path'

// Memory storage keeps file buffer in RAM for direct cloud upload to ImageKit
const storage = multer.memoryStorage()

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
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max limit
    fileFilter
})
