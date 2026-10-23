import mongoose from 'mongoose'
import dns from 'dns'

// Ensure reliable DNS resolution for MongoDB Atlas SRV records
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])
} catch (e) {
    // Ignore if not supported in current environment
}

let isDbConnected = false

export const getDbStatus = () => isDbConnected

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/unity_print'
        console.log(`⏳ Connecting to MongoDB at: ${uri.replace(/\/\/.*@/, '//<credentials>@')} ...`)
        
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000
        })
        isDbConnected = true
        console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`)
        return conn
    } catch (error) {
        isDbConnected = false
        console.error('❌ MongoDB Connection Error:', error.message)
        console.warn('👉 Tip: Make sure your IP is whitelisted (0.0.0.0/0) in MongoDB Atlas Network Access.')
    }
}
