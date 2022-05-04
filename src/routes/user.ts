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
router.post('/', createUser)

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', authenticate, updateUser)
router.delete('/:id', authenticate, deleteUser)

// ADMIN ROUTES
router.get('/get/count', authenticate, administrator, getUserCount)

export default router
