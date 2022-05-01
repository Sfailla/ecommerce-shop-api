class CustomError extends Error {
  code?: string
  status?: number
  value?: string
}

export class UniqueConstraintError extends CustomError {
  constructor(public message: string, public value?: string) {
    super(`${value} must be unique`)

    this.name = 'unique-constraint-error'
    this.code = 'UNIQUE_CONSTRAINT_ERROR'
    this.status = 409
    this.message = message
    this.value = value || 'n/a'

    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, UniqueConstraintError)
    }
  }
}

// class TokenExpiredError extends Error {
//   constructor(status = 403, message) {
//     super(message)

//     this.status = status
//     this.code = 'ERR_TOKEN_EXPIRED'
//     this.name = 'TokenExpiredError'
//     this.message = message

//     if (Error.captureStackTrace) {
//       Error.captureStackTrace(this, TokenExpiredError)
//     }
//   }
// }

export class RequiredParameterError extends CustomError {
  constructor(public message: string, public value?: string) {
    super(`${value} can not be null or undefined.`)

    this.name = 'required-param-error'
    this.code = 'REQUIRED_PARAM_ERROR'
    this.status = 400
    this.message = message
    this.value = value || 'n/a'

    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, RequiredParameterError)
    }
  }
}

export class ValidationError extends CustomError {
  constructor(public message: string) {
    super(message)

    this.name = 'valdiation-error'
    this.code = 'VALIDATION_ERROR'
    this.status = 403
    this.message = message

    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, ValidationError)
    }
  }
}

export class UnauthorizedError extends CustomError {
  constructor(public message: string) {
    super(message)

    this.status = 401
    this.code = 'UNAUTHORIZED_ERROR'
    this.name = 'unauthorized-error'
    this.message = message

    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, UnauthorizedError)
    }
  }
}
