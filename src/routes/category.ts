import express, { Router } from 'express'

import { CategoryController } from '../controllers/index.js'
import { ICategoryController } from '../types/category.js'
import { CategoryModel } from '../models/index.js'

const categoryController: ICategoryController = new CategoryController(CategoryModel)

const { getCategories, createCategory } = categoryController

const router: Router = express.Router()

router.get('/', getCategories)
router.post('/', createCategory)

export default router
