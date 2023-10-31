import { Router } from "express";
import { userPermissions, createNewDataUser } from "../../controllers/users/auth.controllers.js";

const permissionController = new userPermissions()
const makeUser = new createNewDataUser()

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
routerPermissionsUser.post(`${path}/v1/create-user-provider`, (req, res) => {
    makeUser.createUserProvider(req, res)
})

// & show all users
routerPermissionsUser.post(`${path}/v1/create-user-provider`, (req, res) => {
    makeUser.showUsers(req, res)
})

export default routerPermissionsUser