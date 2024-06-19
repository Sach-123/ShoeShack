import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connectionInstance =await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`)
        console.log('Database Connected! Host:', connectionInstance.connection.host)
    } catch (error) {
        console.log("❌ Database connection error !!!");
    }
}

export {connectDB}