import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../utils/customErrors.js'
import { verifyToken } from '../utils/helperFns.js'
import { UserPayload } from '../types/shared.js'
import { JwtPayload } from 'jsonwebtoken'

const authenticate = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('x-auth-token')
    if (!token) throw new UnauthorizedError('No auth token provided')

    const decoded: UserPayload | JwtPayload | string = await verifyToken(
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

export default authenticate
