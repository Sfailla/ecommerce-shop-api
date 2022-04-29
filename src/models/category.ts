import mongoose from 'mongoose'

import { Category } from '../types/category'

const categorySchema = new mongoose.Schema<Category>({
  name: { type: String, required: true },
  icon: { type: String },
  color: { type: String }
})

categorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id
  }
})

const CategoryModel = mongoose.model<Category>('Category', categorySchema)

export default CategoryModel
