import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"
import colors from "colors"

dotenv.config()

const PORT = process.env.PORT
const server = express()

// ? middlewares
server.use(morgan("dev"))
server.use(cors())

// ? endpoints

const serverListening = () => {
    try {
        server.listen(PORT)
        console.log(`listening on port ${PORT}`.yellow)
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

serverListening()