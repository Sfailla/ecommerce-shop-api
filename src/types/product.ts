import { Request, Response } from 'express'

export interface ProductClass {
  getProducts(req: Request, res: Response): Promise<void>
  createProduct(req: Request, res: Response): Promise<void>
}

export interface Product {
  name: string
  image: string
  countInStock: number
}
