import { userModel, validateUser } from "../../models/users/user.model.js"
import { providerModel, validateDataProvider } from "../../models/users/provider.model.js"
import { encryptPassword, verifyPassword } from "../../middlewares/hash.password.js"



// todo: validator class
class validateDataReceived {
    constructor(email, username, lastname) {
        this.email = email
        this.username = username,
            this.lastname = lastname
    }

    // ? read only data
    readDataUserReceived(req, res) {
        res.json({
            emailReceived: this.email,
            usernameReceived: this.username,
            lastnameReceived: this.lastname
        })
    }

    // ? validate todo data received of all controllers
    async validateDataCreateUser(req, res) {
        const isExistsInDatabase = await userModel.findOne({ email })

        if (isExistsInDatabase) {
            res.json({ isExists: true, details: "éxiste ya", dataReceived: isExistsInDatabase })
        }
    }
}

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
                // return
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

            // ? validate if user exists in database
            const newValidationDataReceived = new validateDataReceived(email, lastname, username)
            console.log(newValidationDataReceived)

            const saveInDatabase = await userModel.create(userData)
            if (!saveInDatabase) {
                res.json({ success: false, details: "no se ha podido" })
            }

            res.status(200).json({ success: true, userCreated: saveInDatabase, details: "se ha creado con éxito" })

        } catch (error) {
            console.error(error)
            res.json({ error: true, message: error })
        }
    }

    async createUserProvider(req, res) {
        try {

        } catch (error) {
            console.error(error)
            res.json({ error: true, details: error })
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