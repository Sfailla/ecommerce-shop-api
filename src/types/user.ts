import { NextFunction, Request, Response } from 'express'

export interface UserClass {
  login: (req: Request, res: Response, next: NextFunction) => Promise<void>
  register: (req: Request, res: Response, next: NextFunction) => Promise<void>
  getUsers(req: Request, res: Response, next: NextFunction): void
  getUser(req: Request, res: Response, next: NextFunction): void
  getUserCount(req: Request, res: Response, next: NextFunction): void
  createUser(req: Request, res: Response, next: NextFunction): void
  updateUser(req: Request, res: Response, next: NextFunction): void
  deleteUser(req: Request, res: Response, next: NextFunction): void
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
