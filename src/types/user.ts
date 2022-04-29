import { Request, Response } from 'express'

export interface UserClass {
  getUsers(req: Request, res: Response): void
  getUser(req: Request, res: Response): void
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
