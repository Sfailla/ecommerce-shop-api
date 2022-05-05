import { NextFunction, Request, Response } from 'express'
import { Category } from './category'

export type MulterImageFiles =
  | { [fieldname: string]: Express.Multer.File[] }
  | Express.Multer.File[]

export interface ProductFilters {
  category?: string | string[]
}
export interface ProductClass {
  getProducts(req: Request, res: Response, next: NextFunction): Promise<void>
  getProduct(req: Request, res: Response, next: NextFunction): Promise<void>
  getProductCount(req: Request, res: Response, next: NextFunction): Promise<void>
  getFeaturedProducts(req: Request, res: Response, next: NextFunction): Promise<void>
  createProduct(req: Request, res: Response, next: NextFunction): Promise<void>
  updateProduct(req: Request, res: Response, next: NextFunction): Promise<void>
  uploadImageGallery(req: Request, res: Response, next: NextFunction): Promise<void>
  deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void>
}

export interface Product {
  id: string
  name: string
  description: string
  richDescription: string
  image: string
  images: string[]
  brand: string
  price: number
  category: Category
  countInStock: number
  rating: number
  numReviews: number
  isFeatured: boolean
  createdAt: Date
}
