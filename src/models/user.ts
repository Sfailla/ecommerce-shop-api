import mongoose from 'mongoose'
import { User } from '../types/user'

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  street: { type: String },
  apartment: { type: String },
  city: { type: String },
  zip: { type: String },
  country: { type: String },
  isAdmin: { type: Boolean, default: false }
})

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id
    delete ret.password
  }
})

const UserModel = mongoose.model<User>('User', userSchema)

export default UserModel
