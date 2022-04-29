import express, { Router } from 'express'

import { UserController } from '../controllers/index.js'
import { UserClass } from '../types/user.js'
import { UserModel } from '../models/index.js'

const userController: UserClass = new UserController(UserModel)

const { getUsers, createUser } = userController

const router: Router = express.Router()

router.get('/', getUsers)

router.post('/', createUser)

export default router
