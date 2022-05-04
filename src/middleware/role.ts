import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../utils/customErrors.js'

// check that user has property isAdmin: true
const administrator = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    if (!req.user.isAdmin) throw new UnauthorizedError('user is not an administrator')
    next()
  } catch (error) {
    next(error)
  }
}

export default administrator
