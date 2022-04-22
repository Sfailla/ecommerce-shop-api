import { Request, Response } from 'express'
import { DbModel } from '../types/shared'
import { Product, ProductClass } from '../types/product'

export class ProductController implements ProductClass {
  constructor(public readonly productDb: DbModel<Product>) {
    this.productDb = productDb
  }

  getProducts = async (_req: Request, res: Response) => {
    try {
      const products: Product[] = await this.productDb.find()
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }

  createProduct = async (req: Request, res: Response) => {
    try {
      const product: Product = await this.productDb.create({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
      })
      res.status(200).json({ message: 'Product created successfully', product })
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
