import { Request, Response, NextFunction } from 'express'
import { Product } from './product'
import { User } from './user'

export interface OrderClass {
  getOrders(req: Request, res: Response, next: NextFunction): Promise<void>
  getOrder(req: Request, res: Response, next: NextFunction): Promise<void>
  getOrderCount(req: Request, res: Response, next: NextFunction): Promise<void>
  getTotalSales(req: Request, res: Response, next: NextFunction): Promise<void>
  getAllUserOrders(req: Request, res: Response, next: NextFunction): Promise<void>
  createOrder(req: Request, res: Response, next: NextFunction): Promise<void>
  updateOrder(req: Request, res: Response, next: NextFunction): Promise<void>
  deleteOrder(req: Request, res: Response, next: NextFunction): Promise<void>
}

export type OrderStatus = 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
export type OrderItemId = Pick<OrderItem, 'id'>

export interface TotalSales {
  id: string
  totalSales: number
}

export interface Order {
  id: string
  user: User
  products: Product[]
  total: number
  address: string
  status: OrderStatus
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
  status: OrderStatus
  totalPrice: number
  user: User
  createdAt: Date
}
