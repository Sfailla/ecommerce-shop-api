import express, { Router } from 'express'
import { OrderClass } from '../types/order'
import { OrderController } from '../controllers/index.js'
import { OrderItemModel, OrderModel } from '../models/index.js'

const orderController: OrderClass = new OrderController(OrderModel, OrderItemModel)

const { getOrder, getOrders, createOrder, updateOrder, deleteOrder } = orderController

const router: Router = express.Router()

router.get('/', getOrders)
router.get('/:id', getOrder)
router.post('/', createOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

export default router
