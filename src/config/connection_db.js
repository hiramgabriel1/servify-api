import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const KEY = process.env.KEY_MONGODB

export const connectionDB = async () => {
    try {
        await mongoose.connect(KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("[database]: connected".bgCyan)        
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}