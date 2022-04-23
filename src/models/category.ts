import mongoose from 'mongoose'

import { Category } from '../types/category'

const categorySchema = new mongoose.Schema<Category>({
  name: { type: String, required: true },
  icon: { type: String },
  color: { type: String }
})

const CategoryModel = mongoose.model<Category>('Category', categorySchema)

export default CategoryModel
