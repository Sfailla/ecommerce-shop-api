import { JwtPayload } from 'jsonwebtoken'
import { DecodedUser } from './types/shared'

declare namespace Express {
  export interface Request {
    user: string | DecodedUser | JwtPayload
  }
  export interface Response {
    user: string | DecodedUser | JwtPayload
  }
}
