import { userModel, validateUser } from "../../models/users/user.model.js"
import { providerModel, validateDataProvider } from "../../models/users/provider.model.js"
import { encryptPassword, verifyPassword } from "../../middlewares/hash.password.js"

export class userPermissions {

    async authorizationUser(req, res) {
        try {
            res.json({ message: "hello world" })
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

    async authenticationUser(req, res) {
        try {

        } catch (error) {

        }
    }
}

export class createNewDataUser {

    async createUser(req, res) {
        try {
            const { error, value } = validateUser(req.body)

            if (error) {
                res.status(400).json({ success: false, message: error.details[0].message })
                return
            }

            const { username, lastname, numberPhone, email, password } = value
            const hashedPassword = await encryptPassword(password)

            // ? validate if user exists in database
            const isExistsUser = await userModel.findOne({ username: username, lastname: lastname })
            if (isExistsUser) {
                console.log("la persona que intentas registrar ya")
                res.json({ exists: true, details: "la persona que intentas registrar ya" })
            }

            const emailValidation = await userModel.findOne({ email: email })
            if (emailValidation) {
                console.log("correo ya existe")
                res.json({ exists: true, details: "correo ya existe cambia por otro" })
            }

            // ? save data
            const userData = {
                username: username,
                lastname: lastname,
                numberPhone: numberPhone,
                email: email,
                password: hashedPassword
            }

            const saveInDatabase = await userModel.create(userData)
            if (!saveInDatabase) {
                res.json({ success: false, details: "no se ha podido" })
            }

            res.status(200).json({ success: true, userCreated: saveInDatabase, details: "se ha creado con éxito" })

        } catch (error) {
            if (error.code === 1100) {
                console.log(error)
            }
        }
    }

    async createUserProvider(req, res) {
        try {

        } catch (error) {
            if (error.code === 1100) {
                res.status(400).json({ errro: true, details: "algo salió mal xd" })
            }
            console.error(error.code)
            res.json({ error: true, details: error.code })
        }
    }
}

export class adminFunctions {

    showUsers = async (req, res) => {
        try {
            const isfindData = await userModel.find()

            isfindData ? res.json({ success: true, data: isfindData }) : res.json({ success: true, data: isfindData })

        } catch (error) {
            console.error(error)
            res.json({ error: true, details: error })
        }
    }
}