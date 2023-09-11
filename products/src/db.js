import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI || 4000

export const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('DB connected')
    } catch (error) {
        console.log(error)
    }
}