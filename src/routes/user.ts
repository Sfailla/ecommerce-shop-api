import express, { Router } from 'express'

import { UserController } from '../controllers/index.js'
import { UserClass } from '../types/user.js'
import { UserModel } from '../models/index.js'
import { authenticate, administrator } from '../middleware/index.js'

const userController: UserClass = new UserController(UserModel)

const { login, getUsers, getUser, getUserCount, createUser, updateUser, deleteUser } =
  userController

const router: Router = express.Router()

router.post('/auth/login', login)

router.get('/', getUsers)

router.get('/get/user-count', authenticate, administrator, getUserCount)

router.get('/:id', getUser)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

export default router
