import { Request, Response, NextFunction } from 'express'
import { DbModel } from '../types/shared'
import { Product, ProductClass, ProductFilters } from '../types/product'
import { Category } from '../types/category'
import { CustomError } from '../utils/customErrors'

export default class ProductController implements ProductClass {
  constructor(
    public readonly productDb: DbModel<Product>,
    public readonly categoryDb: DbModel<Category>
  ) {
    this.productDb = productDb
    this.categoryDb = categoryDb
  }

  getProductCount = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const productCount: number = (await this.productDb.countDocuments()) || 0
      res.status(200).json({ success: true, productCount })
    } catch (error) {
      next(error)
    }
  }

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let filters: ProductFilters = {}
      if (req.query.categories) {
        filters = { category: (req.query.categories as string).split(',') }
      }
      const products: Product[] = await this.productDb.find(filters).populate('category')
      res.status(200).json({ success: true, products })
    } catch (error) {
      next(error)
    }
  }

  getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product: Product = await (
        await this.productDb.findById(req.params.id)
      ).populate('category')
      res.status(200).json({ success: true, product })
    } catch (error) {
      next(error)
    }
  }

  getFeaturedProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const count: number = req.params.count ? Number(req.params.count) : 0
      const featured = await this.productDb
        .find({ isFeatured: true })
        .populate('category')
        .limit(count)
      res.status(200).json({ success: true, featured })
    } catch (error) {
      next(error)
    }
  }

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
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
      res.status(200).json({ success: true, message: 'product created successfully', product })
    } catch (error) {
      next(error)
    }
  }

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product: Product = await this.productDb.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      res.status(200).json({ success: true, message: 'product updated successfully', product })
    } catch (error) {
      next(error)
    }
  }

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product: Product = await this.productDb.findByIdAndDelete(req.params.id)
      if (!product) throw new CustomError('issue deleting product by id')
      res.status(200).json({ success: true, message: 'product deleted successfully', product })
    } catch (error) {
      next(error)
    }
  }
}
