import { NextFunction, Request, Response } from 'express'

export interface UserClass {
  login: (req: Request, res: Response) => Promise<void>
  register: (req: Request, res: Response) => Promise<void>
  getUsers(req: Request, res: Response): void
  getUser(req: Request, res: Response, next: NextFunction): void
  createUser(req: Request, res: Response): void
  updateUser(req: Request, res: Response): void
  deleteUser(req: Request, res: Response): void
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  phone: string
  street: string
  apartment: string
  city: string
  zip: string
  country: string
  isAdmin: boolean
}
