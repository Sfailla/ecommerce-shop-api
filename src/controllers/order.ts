import { Request, Response, NextFunction } from 'express'
import { Order, OrderClass } from '../types/order'
import { DbModel } from '../types/shared'

export default class OrderController implements OrderClass {
  constructor(private orderDb: DbModel<Order>) // private productDb: DbModel<Product>,
  // private orderItemDb: DbModel<OrderItem>,
  // private categoryDb: DbModel<Category>
  {
    this.orderDb = orderDb
    // this.productDb = productDb
    // this.orderItemDb = orderItemDb
    // this.categoryDb = categoryDb
  }

  getOrders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.orderDb.find({})
      res.json({ success: true, orders })
    } catch (error) {
      next(error)
    }
  }

  getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderDb.findById(req.params.id)
      res.json({ success: true, order })
    } catch (error) {
      next(error)
    }
  }

  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderDb.create(req.body)
      res.json({ success: true, message: 'order created successfully', order })
    } catch (error) {
      next(error)
    }
  }

  updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderDb.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.json({ success: true, message: 'order updated successfully', order })
    } catch (error) {
      next(error)
    }
  }

  deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderDb.findByIdAndDelete(req.params.id)
      res.json({ success: true, message: 'order deleted successfully', order })
    } catch (error) {
      next(error)
    }
  }
}
