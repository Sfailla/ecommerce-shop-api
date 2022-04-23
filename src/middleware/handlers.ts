import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

type CustomError = Error & {
  code?: number
  status?: number
  name?: string
  message?: string
  stack?: string
}

// catch 404 and forward to error handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error: CustomError = new Error(`Not Found 🤔 - ${req.originalUrl}`)
  error.status = 404
  res.status(404)
  next(error)
}

export const errorHandler = (error: ErrorRequestHandler, req: Request, res: Response): void => {
  const isDevelopment: boolean = req.app.get('env') === 'development'
  const { code, status, name, message, stack } = error as unknown as CustomError

  // set locals, only providing error in development
  res.locals.status = status
  res.locals.code = code
  res.locals.name = name
  res.locals.message = message
  res.locals.error = isDevelopment ? error.toString() : {}

  res.status(status || 500).send({
    error: {
      status,
      code,
      name,
      message,
      stack
    }
  })
}

export const handleListen = (port: number, env: string): void => {
  console.log(`port listening on ${port} \nNODE_ENV=${env}`)
}
