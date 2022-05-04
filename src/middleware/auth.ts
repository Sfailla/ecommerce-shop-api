import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../utils/customErrors.js'
import { verifyToken } from '../utils/helperFns.js'
import { DecodedUser } from '../types/shared.js'

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('x-auth-token')
    if (!token) throw new UnauthorizedError('No auth token provided')

    const decoded: DecodedUser = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded
    res.locals.user = decoded
    next()
  } catch (err) {
    const error = err as UnauthorizedError
    next(error)
  }
}

export default authenticate
