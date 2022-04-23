import express, { Router } from 'express'

import { ProductController } from '../controllers/index.js'
import { IProductController } from '../types/product.js'
import { ProductModel } from '../models/index.js'

const productController: IProductController = new ProductController(ProductModel)

const { getProducts, createProduct } = productController

const router: Router = express.Router()

router.get('/', getProducts)
router.post('/', createProduct)

export default router
