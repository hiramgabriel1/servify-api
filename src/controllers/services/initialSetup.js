import { providerModel } from "../../models/users/provider.model.js"

export class services {

    async renderServices(req, res) {
        try {

            // find service to db
            const services = await providerModel.find()

            console.log(services)
            res.status(200).json({ finded: true, details: services })

        } catch (error) {
            console.error(error)
        }
    }

    async showServicesByTitle(req, res) {
        try {
            const role = req.params.role.toLowerCase()

            const isFinded = await providerModel.findOne({ role: role })
            if (!isFinded) {
                res.json({ details: "no se ha encontrado" })

                return false
            }

            res.json({ details: isFinded })

            console.log(isFinded)
        } catch (error) {
            console.error(error)
        }
    }

    // async categorys(req, res) {
    //     try {
            
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    async popularServices(req, res){
        try {
            
        } catch (error) {
            console.error(error)
        }
    }
}