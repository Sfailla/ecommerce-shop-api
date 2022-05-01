import { NextFunction, Request, Response } from 'express'

export interface CategoryClass {
  getCategories(req: Request, res: Response, next: NextFunction): void
  getCategory(req: Request, res: Response, next: NextFunction): void
  createCategory(req: Request, res: Response, next: NextFunction): void
  updateCategory(req: Request, res: Response, next: NextFunction): void
  deleteCategory(req: Request, res: Response, next: NextFunction): void
}

export interface Category {
  name: string
  icon: string
  color: string
}
