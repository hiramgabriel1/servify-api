import { Router } from "express";
import { services } from "../../controllers/services/initialSetup.js";
import cacheInit from "../../middlewares/cacheInit.js";

const serviceRender = new services()
const pathService = "/api/service"
const routerService = Router()

routerService.get(`${pathService}/show-services`, cacheInit, (req, res) => {
    serviceRender.renderServices(req, res)
})

routerService.get(`${pathService}/search-service/:role`, cacheInit, (req, res) => {
    serviceRender.showServicesByTitle(req, res)
})

routerService.get(`${pathService}/popular-services`, cacheInit, (req, res) => {
    serviceRender.popularServices(req, res)
})

export default routerService