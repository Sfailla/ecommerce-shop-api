import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../utils/customErrors.js'
import { verifyToken } from '../utils/helperFns.js'
import { DecodedUser } from '../types/shared.js'
import { JwtPayload } from 'jsonwebtoken'

interface ExtendedRequest extends Request {
  user: string | DecodedUser | JwtPayload
}

export const authenticate = async (
  req: ExtendedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('x-auth-token')
    if (!token) throw new UnauthorizedError('No auth token provided')

    const decoded: string | DecodedUser | JwtPayload = await verifyToken(
      token,
      process.env.ACCESS_TOKEN_SECRET
    )
    req.user = decoded
    next()
  } catch (err) {
    const error = err as UnauthorizedError
    next(error)
  }
}
