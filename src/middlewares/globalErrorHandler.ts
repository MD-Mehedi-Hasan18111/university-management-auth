import { ErrorRequestHandler } from 'express'
import config from '../config'
import { IGenericError } from '../interfaces/error'
import handleValidationError from '../errors/handleValidationError'
import ApiError from '../errors/ApiError'
import { logger1 } from '../shared/logger'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log(`GlobalErrorHandler: `, err)
    : logger1.error('GlobalHandlerError', err)

  let statusCode = 5000
  let message = 'Something went wrong!'
  let errorMessages: IGenericError[] = []

  if (err?.name === 'ValidationError') {
    const simplified = handleValidationError(err)
    statusCode = simplified.statusCode
    message = simplified.message
    errorMessages = simplified.errorMessages
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof ApiError) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages: errorMessages,
    stack: config.env !== 'production' ? err.stack : undefined,
  })
  next()
}

export default globalErrorHandler
