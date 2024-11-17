const express = require('express')
const routes = express.Router()

const  {userRegister,userLogin} = require("../controller/userController")
const {leadCreate,leadFetch,leadDelete,leadUpdate} = require("../controller/leadController")
const authMiddleware = require("../auth/auth")
routes.post('/auth/register',userRegister)
routes.post('/auth/login',userLogin)
routes.post("/leads",authMiddleware,leadCreate)
routes.get("/leads",authMiddleware,leadFetch)
routes.delete("/leads/:id",leadDelete)
routes.put("/leads/:id",authMiddleware,leadUpdate)
module.exports = routes;

