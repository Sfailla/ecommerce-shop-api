import { Request, Response, NextFunction } from 'express'
import { DbModel } from '../types/shared'
import { Product, ProductClass, ProductFilters } from '../types/product'
import { Category } from '../types/category'
import { CustomError } from '../utils/customErrors.js'

export default class ProductController implements ProductClass {
  constructor(
    private readonly productDb: DbModel<Product>,
    private readonly categoryDb: DbModel<Category>
  ) {
    this.productDb = productDb
    this.categoryDb = categoryDb
  }

  getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let filters: ProductFilters = {}
      if (req.query.categories) {
        filters = { category: (req.query.categories as string).split(',') }
      }
      const products: Product[] = await this.productDb.find(filters).populate('category')
      if (!products) throw new CustomError('issue finding products')
      res.status(200).json({ success: true, products })
    } catch (error) {
      next(error)
    }
  }

  getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product: Product = await (
        await this.productDb.findById(req.params.id)
      ).populate('category')
      if (!product) throw new CustomError('issue finding product by id')
      res.status(200).json({ success: true, product })
    } catch (error) {
      next(error)
    }
  }

  createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category: Category = await this.categoryDb.findById(req.body.category)
      if (!category) throw new CustomError(`issue finding category id: ${req.body.category}`)

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
      if (!product) throw new CustomError('issue creating product')
      res.status(200).json({ success: true, message: 'product created successfully', product })
    } catch (error) {
      next(error)
    }
  }

  updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product: Product = await this.productDb.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      if (!product) throw new CustomError('issue updating product')
      res.status(200).json({ success: true, message: 'product updated successfully', product })
    } catch (error) {
      next(error)
    }
  }

  deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product: Product = await this.productDb.findByIdAndDelete(req.params.id)
      if (!product) throw new CustomError(`issue deleting product with id: ${req.params.id}`)
      res.status(200).json({ success: true, message: 'product deleted successfully', product })
    } catch (error) {
      next(error)
    }
  }

  getFeaturedProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const count: number = req.params.count ? Number(req.params.count) : 0
      const featured: Product[] = await this.productDb
        .find({ isFeatured: true })
        .populate('category')
        .limit(count)
      if (!featured) throw new CustomError('issue finding featured products')
      res.status(200).json({ success: true, featuredProducts: featured })
    } catch (error) {
      next(error)
    }
  }

  getProductCount = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productCount: number = (await this.productDb.countDocuments()) || 0
      if (!productCount) throw new CustomError('issue finding product count')
      res
        .status(200)
        .json({
          success: true,
          message: `product count is ${productCount}`,
          itemCount: productCount
        })
    } catch (error) {
      next(error)
    }
  }
}
