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

            const userData = {
                username: username,
                lastname: lastname,
                numberPhone: numberPhone,
                email: email,
                password: hashedPassword
            }

            const saveInDatabase = await userModel.create(userData)

            if (!saveInDatabase) {
                res.json({ success: false, message: "no se ha podido" })
            } else {
                res.status(200).json({ success: true, dataCreated: saveInDatabase, message: "se ha creado con éxito" })
            }

        } catch (error) {
            console.error(error)
            res.json({ error: true, message: error })
        }
    }

    async createUserProvider(req, res) {
        try {

        } catch (error) {
            console.error(error)
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
        }
    }
}