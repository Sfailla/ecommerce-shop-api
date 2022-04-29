import express, { Router } from 'express'

import { ProductController } from '../controllers/index.js'
import { ProductClass } from '../types/product.js'
import { ProductModel, CategoryModel } from '../models/index.js'

const productController: ProductClass = new ProductController(ProductModel, CategoryModel)

const {
  getProducts,
  getProduct,
  getProductCount,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = productController

const router: Router = express.Router()

router.get('/', getProducts)

router.get('/get/product-count', getProductCount)

router.get('/get/featured/:count', getFeaturedProducts)

router.get('/:id', getProduct)

router.post('/', createProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

export default router
