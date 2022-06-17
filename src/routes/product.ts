import express, { Router } from 'express'

import { ProductController } from '../controllers/index.js'
import { ProductClass } from '../types/product.js'
import { ProductModel, CategoryModel } from '../models/index.js'
import { administrator } from '../middleware/index.js'
import { uploadImage, uploadImages } from '../utils/upload.js'

const productController: ProductClass = new ProductController(ProductModel, CategoryModel)

const {
  getProducts,
  getProduct,
  getProductCount,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  uploadImageGallery,
  deleteProduct
} = productController

const router: Router = express.Router()

router.get('/', getProducts)
router.get('/get/featured/:count', getFeaturedProducts)
router.get('/:id', getProduct)

router.post('/', uploadImage, createProduct)

router.put('/:id', uploadImage, updateProduct)
router.put('/upload/gallery/:id', uploadImages, uploadImageGallery)

router.delete('/:id', deleteProduct)

// ADMIN ROUTES
router.get('/get/count', administrator, getProductCount)

export default router
