import { Request, Response } from 'express'
import { DbModel } from '../types/shared'
import { Category, CategoryClass } from '../types/category'

export default class CategoryController implements CategoryClass {
  constructor(public readonly categoryDb: DbModel<Category>) {
    this.categoryDb = categoryDb
  }

  getCategories = async (_req: Request, res: Response) => {
    try {
      const categories: Category[] = await this.categoryDb.find()
      res.status(200).json({ success: true, categories })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }

  getCategory = async (req: Request, res: Response) => {
    try {
      const category: Category = await this.categoryDb.findById(req.params.id)
      res.status(200).json({ success: true, category })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }

  createCategory = async (req: Request, res: Response) => {
    try {
      const { name, icon, color } = req.body
      const category: Category = await this.categoryDb.create({ name, icon, color })
      res.status(200).json({ success: true, message: 'category created successfully', category })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }

  updateCategory = async (req: Request, res: Response) => {
    try {
      const category: Category = await this.categoryDb.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })

      res.status(200).json({ success: true, message: 'category updated successfully', category })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }

  deleteCategory = async (req: Request, res: Response) => {
    try {
      const category: Category = await this.categoryDb.findByIdAndDelete(req.params.id)
      res.status(200).json({ success: true, message: 'category deleted successfully', category })
    } catch (error) {
      res.status(500).json({
        success: false,
        error
      })
    }
  }
}
