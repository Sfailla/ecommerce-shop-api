import { Request, Response } from 'express'

export interface ICategoryController {
  getCategories(req: Request, res: Response): void
  getCategory(req: Request, res: Response): void
  createCategory(req: Request, res: Response): void
  updateCategory(req: Request, res: Response): void
  deleteCategory(req: Request, res: Response): void
}

export interface Category {
  name: string
  icon: string
  color: string
}
