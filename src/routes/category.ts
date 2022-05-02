import express, { Router } from 'express'

import { CategoryController } from '../controllers/index.js'
import { CategoryClass } from '../types/category.js'
import { CategoryModel } from '../models/index.js'
import { authenticate } from '../middleware/index.js'

const categoryController: CategoryClass = new CategoryController(CategoryModel)

const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } =
  categoryController

const router: Router = express.Router()

router.get('/', getCategories)

router.get('/:id', getCategory)

router.post('/', authenticate, createCategory)

router.put('/:id', authenticate, updateCategory)

router.delete('/:id', authenticate, deleteCategory)

export default router
