import mongoose from "mongoose"


export const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("MongoDb connected")
    } catch (error) {

    }
}