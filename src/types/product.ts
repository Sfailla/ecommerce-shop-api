import { Request, Response } from 'express'

export interface IProductController {
  getProducts(req: Request, res: Response): Promise<void>
  createProduct(req: Request, res: Response): Promise<void>
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
