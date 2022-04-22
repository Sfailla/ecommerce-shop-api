import express, { Router } from 'express'

import { ProductController } from '../controllers/product.js'
import { ProductClass } from '../types/product.js'
import { ProductModel } from '../models/index.js'

const productController: ProductClass = new ProductController(ProductModel)
const { getProducts, createProduct } = productController

const router: Router = express.Router()

router.get('/', getProducts)
router.post('/', createProduct)

export default router
