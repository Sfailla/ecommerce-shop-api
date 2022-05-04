import express, { Router } from 'express'
import { OrderClass } from '../types/order'
import { OrderController } from '../controllers/index.js'
import { OrderItemModel, OrderModel } from '../models/index.js'
import { administrator, authenticate } from '../middleware/index.js'

const orderController: OrderClass = new OrderController(OrderModel, OrderItemModel)

const { getOrder, getOrders, getOrderCount, getTotalSales, createOrder, updateOrder, deleteOrder } =
  orderController

const router: Router = express.Router()

router.get('/', getOrders)
router.get('/:id', getOrder)
router.post('/', authenticate, createOrder)
router.put('/:id', authenticate, updateOrder)
router.delete('/:id', authenticate, deleteOrder)

// ADMIN ROUTES

router.get('/get/sales', authenticate, administrator, getTotalSales)
router.get('/get/count', authenticate, administrator, getOrderCount)

export default router
