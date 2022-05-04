import { Request, Response, NextFunction } from 'express'
import { Product } from './product'

export interface OrderClass {
  getOrders(req: Request, res: Response, next: NextFunction): Promise<void>
  getOrder(req: Request, res: Response, next: NextFunction): Promise<void>
  createOrder(req: Request, res: Response, next: NextFunction): Promise<void>
  updateOrder(req: Request, res: Response, next: NextFunction): Promise<void>
  deleteOrder(req: Request, res: Response, next: NextFunction): Promise<void>
}

export interface Order {
  id: string
  user: string
  products: Product[]
  total: number
  address: string
  status: string
  createdAt: Date
}

export interface OrderItem {
  id: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  orderItems: OrderItem[]
  shippingAddress: string
  shippingAddress2: string
  city: string
  zip: string
  country: string
  phone: string
  status: string | 'pending' | 'shipped' | 'delivered' | 'cancelled'
  totalPrice: number
  user: string
  createdAt: Date
}
