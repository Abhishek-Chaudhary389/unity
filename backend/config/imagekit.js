import ImageKit from 'imagekit'
import dotenv from 'dotenv'

dotenv.config()

export const isImageKitConfigured = Boolean(
    process.env.IMAGEKIT_PUBLIC_KEY &&
    process.env.IMAGEKIT_PRIVATE_KEY &&
    process.env.IMAGEKIT_URL_ENDPOINT
)

let imagekit = null

if (isImageKitConfigured) {
    try {
        imagekit = new ImageKit({
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
        })
        console.log('🖼️ ImageKit Cloud Storage Initialized Successfully!')
    } catch (err) {
        console.error('❌ ImageKit Initialization Error:', err.message)
    }
} else {
    console.warn('⚠️ ImageKit keys not configured. Falling back to local storage.')
}

export default imagekit

/**
 * Upload file to ImageKit
 * @param {Buffer|string} file - Buffer or base64 string
 * @param {string} fileName - File name with extension
 * @param {string} folder - Folder path in ImageKit (e.g., '/unity_packaging')
 * @returns {Promise<{url: string, fileId: string}>}
 */
export async function uploadToImageKit(file, fileName, folder = '/unity_packaging') {
    if (!imagekit) {
        throw new Error('ImageKit is not configured')
    }

    // Convert Buffer to base64 if needed
    const filePayload = Buffer.isBuffer(file) ? file.toString('base64') : file

    const response = await imagekit.upload({
        file: filePayload,
        fileName: fileName || `packaging_${Date.now()}.jpg`,
        folder: folder,
        useUniqueFileName: true
    })

    return {
        url: response.url,
        fileId: response.fileId,
        thumbnailUrl: response.thumbnailUrl || response.url
    }
}
