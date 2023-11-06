import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["Authorization"]
    const token = authHeader && authHeader.split("")[1]

    if (token == null) {
        return res.status(403)
    }
    jwt.verify(token, "secret_key", (err, user) => {
        if (err) {
            console.log(err)
        }

        req.user = user
        next()
    })
}

// const generateToken = (payload, secret_key, timeExpired) => {
//     try {
//         return Jwt.sign(payload, secret_key, { expiresIn: timeExpired })
//     } catch (error) {
//         console.log(error)
//     }
// }

// const verifyToken = (token, secret_key) => {
//     try {
//         const decodedToken = Jwt.verify(token, secret_key)

//         return decodedToken
//     } catch (error) {
//         console.log(error)
//     }
// }

export { verifyToken }