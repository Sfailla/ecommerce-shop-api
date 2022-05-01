import { Model } from 'mongoose'

export type DbModel<T> = Model<T>

export interface DecodedUser {
  id: string
  name: string
  email: string
  isAdmin: boolean
}
