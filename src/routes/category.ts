import express, { Router } from 'express'

import { CategoryController } from '../controllers/index.js'
import { ICategoryController } from '../types/category.js'
import { CategoryModel } from '../models/index.js'

const categoryController: ICategoryController = new CategoryController(CategoryModel)

const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } =
  categoryController

const router: Router = express.Router()

router.get('/', getCategories)

router.get('/:id', getCategory)

router.post('/', createCategory)

router.put('/:id', updateCategory)

router.delete('/:id', deleteCategory)

export default router
