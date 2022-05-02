import { DecodedUser } from './types/shared'

declare module 'Express' {
  export interface Request {
    user?: DecodedUser
  }
  export interface Response {
    user?: DecodedUser
  }
}
