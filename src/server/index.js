import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"
import { connectionDB } from "../config/connection_db.js"
import routerPermissionsUser from "../routes/users/permissionRouter.js"
import colors from "colors"

connectionDB()
dotenv.config()

const PORT = process.env.PORT
const server = express()

// ? middlewares
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"))
server.use(express.json())
server.use(cors())

// ? endpoints
server.use(routerPermissionsUser)
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});


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