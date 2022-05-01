enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNIQUE_CONSTRAINT = 409,
  INTERNAL_SERVER_ERROR = 500
}

export class CustomError extends Error {
  public code: string
  public status: HttpStatusCode

  constructor(public readonly message: string) {
    super(message)

    this.name = 'generic-error'
    this.code = 'GENERIC_API_ERROR'
    this.status = HttpStatusCode.BAD_REQUEST
  }
}

export class UniqueConstraintError extends CustomError {
  constructor(public value?: string) {
    super(`${value} must be unique`)

    this.name = 'unique-constraint-error'
    this.code = 'UNIQUE_CONSTRAINT_ERROR'
    this.status = HttpStatusCode.UNIQUE_CONSTRAINT
    this.value = value || 'value'

    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, UniqueConstraintError)
    }
  }
}

export class TokenExpiredError extends CustomError {
  constructor(public message: string) {
    super(message)

    this.name = 'TokenExpiredError'
    this.code = 'ERR_TOKEN_EXPIRED'
    this.status = HttpStatusCode.UNAUTHORIZED

    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, TokenExpiredError)
    }
  }
}

export class RequiredParameterError extends CustomError {
  constructor(public value: string = 'value') {
    super(`${value} can not be null or undefined.`)

    this.name = 'required-param-error'
    this.code = 'REQUIRED_PARAM_ERROR'
    this.status = HttpStatusCode.BAD_REQUEST
    this.value = value

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
    this.status = HttpStatusCode.FORBIDDEN

    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, ValidationError)
    }
  }
}

export class UnauthorizedError extends CustomError {
  constructor(public message: string) {
    super(message)

    this.code = 'UNAUTHORIZED_ERROR'
    this.name = 'unauthorized-error'
    this.status = HttpStatusCode.UNAUTHORIZED

    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, UnauthorizedError)
    }
  }
}
