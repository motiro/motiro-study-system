import { ApiError } from 'domain/entities/error'
import { NextFunction, Request, Response } from 'express'

export const notFoundMiddleware = (_: Request, res: Response) => {
  res.status(404).send('Route not found')
}

interface CustomError extends Error {
  code?: number
  errors: Error
  keyValue: Error
}

export const errorMiddleware = (
  error: CustomError & Partial<ApiError>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(
    `\n${error.name}\nCode: ${error.statusCode}\nMessage: ${
      error.message
    }\nStack:\n${error.stack?.split('\n').splice(1).join('\n')}`
  )

  let statusCode = error.statusCode ?? 500
  let message = error.statusCode ? error.message : 'Unexpected error'

  if (error.name === 'ValidationError') {
    message = Object.values(error.errors)
      .map(item => item.message)
      .join(' ')
    statusCode = 400
  }

  if (error.name === 'TokenExpiredError') {
    message = 'Session expired'
    statusCode = 401
  }

  if (error.code === 11000) {
    message = `Provided ${Object.keys(error.keyValue)} is already registered`
    statusCode = 409
  }

  return res.status(statusCode).json({ error: message })
}
