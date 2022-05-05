import express, { Router } from 'express'

import { ProductController } from '../controllers/index.js'
import { ProductClass } from '../types/product.js'
import { ProductModel, CategoryModel } from '../models/index.js'
import { administrator, authenticate } from '../middleware/index.js'
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

router.post('/', uploadImage, authenticate, createProduct)

router.put('/:id', uploadImage, authenticate, updateProduct)
router.put('/upload/gallery/:id', uploadImages, authenticate, uploadImageGallery)

router.delete('/:id', authenticate, deleteProduct)

// ADMIN ROUTES
router.get('/get/count', authenticate, administrator, getProductCount)

export default router
