import { ApiError } from 'domain/entities/error'
import { NextFunction, Request, Response } from 'express'

export const notFoundMiddleware = (_: Request, res: Response) => {
  res.status(404).send('Route does not exist')
}

interface CustomError extends Error {
  errors: Error
}

export const errorMiddleware = (
  error: CustomError & Partial<ApiError>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(
    `\nError: ${error.name}\nCode: ${error.statusCode}\nMessage: ${error.message}\nStack:\n${error.stack}`
  )

  let statusCode = error.statusCode ?? 500
  let message = error.statusCode ? error.message : 'Unexpected error'

  if (error.name === 'CastError') {
    message = 'Invalid ID'
    statusCode = 400
  }

  return res.status(statusCode).json({ error: message })
}
