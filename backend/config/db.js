import mongoose from 'mongoose'

let isDbConnected = false

export const getDbStatus = () => isDbConnected

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/unity_print'
        console.log(`⏳ Connecting to MongoDB at: ${uri.replace(/\/\/.*@/, '//<credentials>@')} ...`)
        
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout instead of 30s
        })
        isDbConnected = true
        console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`)
        return conn
    } catch (error) {
        isDbConnected = false
        console.error('❌ MongoDB Connection Error:', error.message)
        console.warn('👉 Tip: Agar aapke computer me local MongoDB nahi hai, toh MongoDB Atlas ka connection string backend/.env file me MONGO_URI me dalein.')
    }
}
