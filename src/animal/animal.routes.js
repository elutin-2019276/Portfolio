'use strict'

import { Router } from 'express'
import { deleteA, save, search, test, update } from './animal.controller.js'
import { get } from 'mongoose'
import {
    validateJwt, 
    isAdmin,
} from '../middlewares/validate-jwt.js'

const api = Router()

//ROLE ADMIN
api.post('/save', save, [validateJwt, isAdmin], save)
api.put('/update/:id', update, [validateJwt, isAdmin], update)
api.delete('delete/:id', [validateJwt, isAdmin], deleteA)

//ROLE CLIENT/ADMIN
api.get('/get', [validateJwt], get)
api.post('/search', [validateJwt], search)

api.get('/test', test)
export default api  