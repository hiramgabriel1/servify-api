import { Router } from "express";
import { userPermissions, createNewDataUser } from "../../controllers/users/auth.controllers.js";
import { adminFunctions } from "../../controllers/users/auth.controllers.js";

const permissionController = new userPermissions()
const makeUser = new createNewDataUser()
const admin = new adminFunctions()

const path = "/api"
const routerPermissionsUser = Router()

// & login user
routerPermissionsUser.post(`${path}/v1/authentication-user`, (req, res) => {
    permissionController.authorizationUser(req, res)
})

// & register a new user
routerPermissionsUser.post(`${path}/v1/create-user`, (req, res) => {
    makeUser.createUser(req, res)
})

// & register a new provider user
routerPermissionsUser.post(`${path}/v1/create-provider`, (req, res) => {
    makeUser.createUserProvider(req, res)
})


// TODO: DEV endpoints
// & show all users
routerPermissionsUser.get(`${path}/v1/admin/users`, (req, res) => {
    admin.showUsers(req, res)
})

routerPermissionsUser.delete(`${path}/v1/admin/delete/:id`, (req, res) => {
    admin.deleteData(req, res)
})

export default routerPermissionsUser