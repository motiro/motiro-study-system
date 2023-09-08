import { ApiError } from 'domain/entities/error'
import { NextFunction, Request, Response } from 'express'

export const notFoundMiddleware = (_: Request, res: Response) => {
  res.status(404).send('Route not found')
}

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(error.message)
  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'Unexpected error'
  return res.status(statusCode).json({ error: message })
}
