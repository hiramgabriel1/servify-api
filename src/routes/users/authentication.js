import { Router } from "express";
import { userPermissions, createNewDataUser } from "../../controllers/users/auth.controllers.js";

const permissionController = new userPermissions()
const makeUser = new createNewDataUser()

const path = "/api"
const routerPermissionsUser = Router()

// & login user
routerPermissionsUser.get(`${path}/v1/authentication-user`, (req, res) => {
    permissionController.authorizationUser(req, res)
})
    
// & create a new user
routerPermissionsUser.post(`${path}/v1/create-user`, (req, res) => {
    makeUser.createUser(req, res)
})

export default routerPermissionsUser