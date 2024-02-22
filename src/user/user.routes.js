'use strict'

import express from 'express'
import { 
    validateJwt,
    isAdmin
     } from '../middlewares/validate-jwt.js' 
import {
    test, 
    register, 
    login,
    update,
    deleteU} from './user.controller.js'

const api = express.Router()

//Middleaware

//ROLE ADMIN
api.get('/test', [validateJwt, isAdmin], test) //<- Solo si está logeado.

//ROLE CLIENT/ADMIN
api.put('/update/:id', [validateJwt], update)
api.delete('/delete/:id', [validateJwt], deleteU)

//PUBLIC
api.post('/register', register)
api.post('/login', login) //JWT



export default api

//export const api <- Tengo sí o sí el nombre que está en este archivo Ej: api
//export default api <- Importar con otro nombre userRoutes

