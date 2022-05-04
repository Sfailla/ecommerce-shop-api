import { UserPayload } from './types/shared'

declare module 'Express' {
  export interface Request {
    user: UserPayload
  }
  export interface Response {
    user: UserPayload
  }
}
