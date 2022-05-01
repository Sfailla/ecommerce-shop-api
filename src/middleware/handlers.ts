import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

type CustomError = Error & {
  code?: number
  status?: number
  value?: string
}

// catch 404 and forward to error handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error: CustomError = new Error(`Not Found 🤔 - ${req.originalUrl}`)
  error.status = 404
  res.status(404)
  next(error)
}

export const errorHandler = (
  error: ErrorRequestHandler,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  // const isDevelopment: boolean = req.app.get('env') === 'development'
  const { code, status, name, message, value, stack } = error as unknown as CustomError

  res.status(status || 500).json({
    error: { code, name, status, message, value, stack }
  })
}

export const handleListen = (port: number, env: string): void => {
  console.log(`port listening on ${port} \nNODE_ENV=${env}`)
}
