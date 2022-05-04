import mongoose from 'mongoose'

import { OrderItem } from '../types/order.js'

const orderItemSchema = new mongoose.Schema<OrderItem>(
  {
    quantity: { type: Number, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
  },
  { collection: 'orderItems' }
)

orderItemSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id
  }
})

const OrderItemModel = mongoose.model<OrderItem>('OrderItem', orderItemSchema)

export default OrderItemModel
