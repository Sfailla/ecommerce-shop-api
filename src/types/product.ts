import { Request, Response } from 'express'

export interface ProductFilters {
  categories?: string | string[]
}
export interface ProductClass {
  getProducts(req: Request, res: Response): Promise<void>
  getProduct(req: Request, res: Response): Promise<void>
  getProductCount(req: Request, res: Response): Promise<void>
  getFeaturedProducts(req: Request, res: Response): Promise<void>
  createProduct(req: Request, res: Response): Promise<void>
  updateProduct(req: Request, res: Response): Promise<void>
  deleteProduct(req: Request, res: Response): Promise<void>
}

export interface Product {
  name: string
  description: string
  richDescription: string
  image: string
  images: string[]
  brand: string
  price: number
  category: string
  countInStock: number
  rating: number
  numReviews: number
  isFeatured: boolean
  createdAt: Date
}
