import { UserPayload } from './types/shared'

declare module 'express' {
  export interface Request {
    user: UserPayload
  }
  export interface Response {
    user: UserPayload
  }
}
