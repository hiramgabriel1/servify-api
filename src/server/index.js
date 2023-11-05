import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"
import rateLimit from "express-rate-limit"
import { connectionDB } from "../config/connection_db.js"
import routerPermissionsUser from "../routes/users/permissionRouter.js"
import colors from "colors"

connectionDB()
dotenv.config()

const PORT = process.env.PORT
const server = express()

// ? middlewares
const requestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    limit: 200, // 100 request for user
    standardHeaders: true,
    message: "[max-requests-received]: se han recibido muchas request de un user".red,
})

server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"))
server.use(express.json())
server.use(requestLimiter)
server.use(cors({
    origin: "localhost:3000",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    exposedHeaders: "Content-Length",
}))

// ? endpoints
server.use(routerPermissionsUser)
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
    next()
});
server.use((req, res) => {
    res.status(404).json("no se ha encontrado la ruta")
})

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