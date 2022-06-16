import { NextFunction, Request, Response } from 'express'
import { DbModel } from '../types/shared'
import { Category, CategoryClass } from '../types/category'
import { CustomError } from '../utils/customErrors.js'

export default class CategoryController implements CategoryClass {
  constructor(private readonly categoryDb: DbModel<Category>) {
    this.categoryDb = categoryDb
  }

  getCategories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categories: Category[] = await this.categoryDb.find()
      if (!categories) throw new CustomError('issue finding categories')
      res.status(200).json({ success: true, categories })
    } catch (error) {
      next(error)
    }
  }

  getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category: Category = await this.categoryDb.findById(req.params.id)
      if (!category) throw new CustomError('issue finding category by id')
      res.status(200).json({ success: true, category })
    } catch (error) {
      next(error)
    }
  }

  createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category: Category = await this.categoryDb.create(req.body)
      if (!category) throw new CustomError('issue creating category')
      res.status(200).json({ success: true, message: 'category created successfully', category })
    } catch (error) {
      next(error)
    }
  }

  updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category: Category = await this.categoryDb.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      if (!category) throw new CustomError('issue updating category by id')
      res.status(200).json({ success: true, message: 'category updated successfully', category })
    } catch (error) {
      next(error)
    }
  }

  deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category: Category = await this.categoryDb.findByIdAndDelete(req.params.id)
      if (!category) throw new CustomError(`issue deleting category with id: ${req.params.id}`)
      res.status(200).json({ success: true, message: 'category deleted successfully', category })
    } catch (error) {
      next(error)
    }
  }
}
