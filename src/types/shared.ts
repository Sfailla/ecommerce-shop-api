import { JwtPayload } from 'jsonwebtoken'
import { Model } from 'mongoose'

export type DbModel<T> = Model<T>

interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

export type DecodedUser = User | string | JwtPayload
