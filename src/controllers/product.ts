import { Request, Response } from 'express'
import { DbModel } from '../types/shared'
import { Product, IProductController } from '../types/product'
import { Category } from '../types/category'

export default class ProductController implements IProductController {
  constructor(
    public readonly productDb: DbModel<Product>,
    public readonly categoryDb: DbModel<Category>
  ) {
    this.productDb = productDb
    this.categoryDb = categoryDb
  }

  getProducts = async (_req: Request, res: Response) => {
    try {
      const products: Product[] = await this.productDb.find().populate('category')
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }

  getProduct = async (req: Request, res: Response) => {
    try {
      const product: Product = await (
        await this.productDb.findById(req.params.id)
      ).populate('category')
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }

  createProduct = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryDb.findById(req.body.category)
      console.log({ category: req.body.category })
      if (!category) res.status(400).json({ message: 'category not found or invalid' })

      const product: Product = await this.productDb.create({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
      })
      res.status(200).json({ message: 'product created successfully', product })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }

  updateProduct = async (req: Request, res: Response) => {
    try {
      const product: Product = await this.productDb.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      res.status(200).json({ message: 'product updated successfully', product })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const product: Product = await this.productDb.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: 'product deleted successfully', product })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }
}
