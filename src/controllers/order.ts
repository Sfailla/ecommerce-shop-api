import { Request, Response, NextFunction } from 'express'
import { Order, OrderItem, OrderClass } from '../types/order'
import { DbModel } from '../types/shared'

export default class OrderController implements OrderClass {
  constructor(private orderDb: DbModel<Order>, private orderItemDb: DbModel<OrderItem>) {
    this.orderDb = orderDb
    this.orderItemDb = orderItemDb
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
      const orderItemIds = req.body.orderItems.map(async (orderItem: OrderItem) => {
        const newOrderItem = await this.orderItemDb.create({
          quantity: orderItem.quantity,
          product: orderItem.product
        })
        return newOrderItem._id
      })
      const order = await this.orderDb.create({ ...req.body, orderItems: orderItemIds })
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
