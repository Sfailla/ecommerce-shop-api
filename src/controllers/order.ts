import { Request, Response, NextFunction } from 'express'
import { Order, OrderItem, OrderClass, TotalSales } from '../types/order'
import { DbModel } from '../types/shared'
import { CustomError } from '../utils/customErrors.js'

export default class OrderController implements OrderClass {
  constructor(private orderDb: DbModel<Order>, private orderItemDb: DbModel<OrderItem>) {
    this.orderDb = orderDb
    this.orderItemDb = orderItemDb
  }

  getOrders = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orders = await this.orderDb
        .find({})
        .populate({
          path: 'user',
          select: 'name'
        })
        .sort({ createdAt: -1 })
      if (!orders) throw new CustomError('issue getting orders')
      res.status(200).json({ success: true, orders })
    } catch (error) {
      next(error)
    }
  }

  getOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const order = await this.orderDb
        .findById(req.params.id)
        .populate('user', 'name')
        .populate({
          path: 'orderItems',
          populate: {
            path: 'product',
            populate: 'category'
          }
        })
      if (!order) throw new CustomError(`issue fetching order with id: ${req.params.id}`)
      res.status(200).json({ success: true, order })
    } catch (error) {
      next(error)
    }
  }

  createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orderItemIds = await Promise.all(
        req.body.orderItems.map(async (orderItem: OrderItem) => {
          const newOrderItem = await this.orderItemDb.create({
            quantity: orderItem.quantity,
            product: orderItem.product
          })
          return newOrderItem._id
        })
      )

      const getOrderPrices = await Promise.all(
        orderItemIds.map(async (orderItemId: Pick<OrderItem, 'id'>) => {
          const orderItem = await this.orderItemDb
            .findById(orderItemId)
            .populate({ path: 'product', select: 'price' })
          const total = orderItem.product.price * orderItem.quantity
          return total
        })
      )

      const totalPrice = getOrderPrices.reduce((acc, cur) => acc + cur, 0)

      if (!orderItemIds) throw new CustomError('issue fetching one or more order-item-id')
      const order = await this.orderDb.create({ ...req.body, orderItems: orderItemIds, totalPrice })
      if (!order) throw new CustomError('issue creating order')
      res.status(200).json({ success: true, message: 'order created successfully', order })
    } catch (error) {
      next(error)
    }
  }

  updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const order = await this.orderDb.findByIdAndUpdate(req.params.id, req.body, { new: true })
      if (!order) throw new CustomError(`issue updating order with id: ${req.params.id}`)
      res.status(200).json({ success: true, message: 'order updated successfully', order })
    } catch (error) {
      next(error)
    }
  }

  deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.orderDb.findByIdAndDelete(req.params.id).then(async (order: Order) => {
        if (!order) throw new CustomError(`issue deleting order with id: ${req.params.id}`)
        order.orderItems.map(async (orderItem: OrderItem) => {
          await this.orderItemDb.findByIdAndDelete(orderItem)
        })
      })
      res.status(200).json({ success: true, message: 'order deleted successfully' })
    } catch (error) {
      next(error)
    }
  }

  getTotalSales = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const getTotalSales: TotalSales[] = await this.orderDb.aggregate([
        { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } }
      ])
      const totalSales = Number(getTotalSales.map((sales) => sales.totalSales).join(''))
      if (!totalSales)
        throw new CustomError('issue calculating the total sales of order collection')
      console.log(totalSales)
      res
        .status(200)
        .json({ success: true, message: `the total sales for orders is ${totalSales}`, totalSales })
    } catch (error) {
      next(error)
    }
  }

  getOrderCount = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orderCount: number = (await this.orderDb.countDocuments()) || 0
      if (!orderCount) throw new CustomError('issue fetching order count')
      res.status(200).json({
        success: true,
        message: `total order count is ${orderCount}`,
        itemCount: orderCount
      })
    } catch (error) {
      next(error)
    }
  }

  getAllUserOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allUserOrders = await this.orderDb
        .find({ user: req.params.userId })
        .populate({
          path: 'orderItems',
          populate: {
            path: 'product',
            populate: 'category'
          }
        })
        .sort({ createdAt: -1 })
      if (!allUserOrders) throw new CustomError(`issue getting all orders for user: ${req.user}`)
      res.status(200).json({ success: true, orders: allUserOrders })
    } catch (error) {
      next(error)
    }
  }
}
