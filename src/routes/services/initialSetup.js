import { Router } from "express";
import { services } from "../../controllers/services/initialSetup.js";

const serviceRender = new services()
const pathService = "/api/service"
const routerService = Router()

routerService.get(`${pathService}/show-services`, (req, res) => {
    serviceRender.renderServices(req, res)
})

routerService.get(`${pathService}/search-service/:role`, (req, res) => {
    serviceRender.showServicesByTitle(req, res)
})


export default routerService