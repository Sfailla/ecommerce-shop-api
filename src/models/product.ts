import mongoose from 'mongoose'
import { Product } from '../types/product'

const productSchema = new mongoose.Schema<Product>({
  name: { type: String },
  image: { type: String },
  countInStock: { type: Number, required: true }
})

const ProductModel = mongoose.model<Product>('Product', productSchema)

export default ProductModel
