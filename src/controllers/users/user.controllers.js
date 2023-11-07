import { userModel, validateUser } from "../../models/users/user.model.js"
import { providerModel, validateDataProvider } from "../../models/users/provider.model.js"
import { encryptPassword, comparePassword } from "../../middlewares/hash.password.js"
import bcrypt, { hash } from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export class userPermissions {

    async authorizationUser(req, res) {
        try {

        } catch (error) {
            console.error(error)
            throw Error(error)
        }
    }

    async authenticationUser(req, res) {
        try {
            const { email, password } = req.body

            // check if find data in database
            const queryFindDataLogin = await userModel.findOne({ email: email })

            !queryFindDataLogin
                ? console.log("not found data")
                : console.log("correo existente")

            const { password: hashedPassword } = queryFindDataLogin
            const matchPassword = await bcrypt.compare(password, hashedPassword)

            if (matchPassword && queryFindDataLogin) {
                console.log("coinciden")

                const token = jwt.sign({ id: userModel._id }, process.env.SECRET_KEY, { expiresIn: 86400 })

                return res.json({ details: "Authentication started!", token: token })
            } else {
                res.status(403).json({ details: "El correo o contraseña no coinciden. Intenta de nuevo" })
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export class createNewDataUser {

    async createUser(req, res) {
        try {
            const { error, value } = validateUser(req.body)

            if (error) {
                res.status(400).json({
                    success: false, message:
                        error.details[0].message
                })

                return false
            }

            const { username, lastname, numberPhone, email, password } = value
            const hashedPassword = await encryptPassword(password)

            // ? validate if user exists in database
            const isExistsUser = await userModel.findOne({ username: username, lastname: lastname })
            if (isExistsUser) {
                console.log("la persona que intentas registrar ya")
                res.json({
                    exists: true,
                    details: "la persona que intentas registrar ya"
                })
            }

            const emailValidation = await userModel.findOne({ email: email })
            if (emailValidation) {
                console.log("correo ya existe")
                res.json({
                    exists: true,
                    details: "correo ya existe cambia por otro"
                })
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
                res.json({
                    success: false,
                    details: "no se ha podido"
                })
            }

            const token = jwt.sign({ id: saveInDatabase._id }, process.env.SECRET_KEY, {
                expiresIn: 86400
            })

            res.status(200).json({
                success: true,
                userCreated: saveInDatabase,
                details: "usuario se ha creado con éxito",
                isToken: token
            })

        } catch (error) {
            if (error.code === 1100) {
                console.log(error)
            }
        }
    }

    async createUserProvider(req, res) {
        try {
            const { error, value } = validateDataProvider(req.body)

            if (error) {
                res.status(400).json({
                    success: false,
                    message: error.details[0].message
                })

                return
            }
            const {
                username,
                lastname,
                email,
                password,
                nameCorporate,
                nameService,
                experience,
                role
            } = value

            const hashedPassword = await encryptPassword(password)

            // ? validate if user exists in database
            const isExistsUser = await providerModel.findOne({
                username: username,
                lastname: lastname
            })
            if (isExistsUser) {
                console.log("la persona que intentas registrar ya")
                res.json({
                    exists: true,
                    details: "la persona que intentas registrar ya"
                })
            }

            const emailValidation = await providerModel.findOne({ email: email })
            if (emailValidation) {
                console.log("correo ya existe")
                res.json({
                    exists: true,
                    details: "correo ya existe cambia por otro"
                })
            }

            const corporateValidation = await providerModel.findOne({ nameCorporate: nameCorporate })
            if (corporateValidation) {
                console.log("la empresa ya existe")
                res.json({
                    isExists: true,
                    details: "ya existe el negocio"
                })
            }

            // ? save data
            const userData = {
                username: username,
                lastname: lastname,
                email: email,
                password: hashedPassword,
                nameCorporate: nameCorporate,
                nameService: nameService,
                experience: experience,
                role: role.toLowerCase()
            }

            const saveInDatabase = await providerModel.create(userData)

            if (!saveInDatabase) {
                res.json({
                    success: false,
                    details: "no se ha podido"
                })
            }
            res.status(200).json({
                success: true,
                userCreated: saveInDatabase,
                details: "provider se ha creado con éxito"
            })

        } catch (error) {
            if (error.code === 1100) {
                res.status(400).json({
                    error: true,
                    details: "algo salió mal"
                })
            }
            console.error(error.code)
            res.json({
                error: true,
                details: error.code
            })
        }
    }
}

export class adminFunctions {

    showUsers = async (req, res) => {
        try {
            const isfindData = await userModel.find()

            isfindData
                ? res.json({
                    success: true,
                    data: isfindData
                })

                : res.json({
                    success: true,
                    data: isfindData
                })

        } catch (error) {
            console.error(error)
            res.json({
                error: true,
                details: error
            })
        }
    }

    async deleteData(req, res) {
        try {
            const queryFindId = await userModel.findByIdAndRemove(req.params.id)

            if (!queryFindId) {
                return res.status(404).json({ message: 'Documento no encontrado' });
            }

            return res.status(200).json({ message: 'Documento eliminado con éxito' });
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }
}