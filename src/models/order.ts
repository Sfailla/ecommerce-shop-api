import mongoose from 'mongoose'

import { Order } from '../types/order.js'

const orderSchema = new mongoose.Schema<Order>({
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem', required: true }],
  shippingAddress: { type: String, required: true },
  shippingAddress2: { type: String },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String },
  status: {
    type: String,
    enum: ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  },
  totalPrice: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
})

orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id
  }
})

const OrderModel = mongoose.model<Order>('Order', orderSchema)

export default OrderModel
