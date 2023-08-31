import { ApiError } from 'domain/entities/error'
import { NextFunction, Request, Response } from 'express'

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error.message)
  const statusCode = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'U2nexpected error'
  return res.status(statusCode).json({ error: message })
}
