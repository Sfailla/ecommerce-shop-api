import { Request, Response, NextFunction } from 'express'
import { DbModel } from '../types/shared'
import { Product, ProductClass, ProductFilters, MulterImageFiles } from '../types/product'
import { Category } from '../types/category'
import { CustomError } from '../utils/customErrors.js'
import { buildImgUploadPath } from '../utils/helperFns.js'

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
    } catch (err) {
      const error = err as CustomError
      next(error)
    }
  }

  createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log({ requestBody: req.body, requestFile: req.file })
      const category: Category = await this.categoryDb.findById(req.body.category)
      if (!category) throw new CustomError(`issue finding category id: ${req.body.category}`)
      if (!req.file) throw new CustomError('issue uploading image file')

      const { basePath, host, uploadPath } = buildImgUploadPath(req)

      const product: Product = await this.productDb.create({
        ...req.body,
        image: `${basePath}://${host}/${uploadPath}/${req.file.filename}`
      })

      console.log({ product })

      if (!product) throw new CustomError('issue creating product')
      res.status(200).json({ success: true, message: 'product created successfully', product })
    } catch (error) {
      next(error)
    }
  }

  updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { basePath, host, uploadPath } = buildImgUploadPath(req)
      const existingProduct = await this.productDb.findById(req.params.id)
      if (!existingProduct)
        throw new CustomError(`issue fetching existing product with id: ${req.params.id}`)
      const updateImage = req.file
        ? `${basePath}://${host}/${uploadPath}/${req.file.filename}`
        : existingProduct.image
      const product: Product = await this.productDb.findByIdAndUpdate(
        req.params.id,
        { ...req.body, image: updateImage },
        { new: true }
      )
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

  uploadImageGallery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { basePath, host, uploadPath } = buildImgUploadPath(req)
      const files: MulterImageFiles = req.files
      if (!files) throw new CustomError('issue in upload files method')
      const uploadedImages: string[] = (files as Express.Multer.File[]).map(
        (file) => `${basePath}://${host}/${uploadPath}/${file.filename}`
      )
      const product: Product = await this.productDb.findByIdAndUpdate(
        req.params.id,
        { images: uploadedImages },
        { new: true }
      )
      res
        .status(200)
        .json({ success: true, message: 'images have been successfully uploaded', product })
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
      res.status(200).json({
        success: true,
        message: `product count is ${productCount}`,
        itemCount: productCount
      })
    } catch (error) {
      next(error)
    }
  }
}
