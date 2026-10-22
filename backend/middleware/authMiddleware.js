import jwt from 'jsonwebtoken'

export const protectAdmin = (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized: Access token missing'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'unity_print_secret_key')
        req.admin = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token. Please log in again.'
        })
    }
}
