import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/login')
        console.log('DB connected')
    } catch (error) {
        console.log(error)
    }
}