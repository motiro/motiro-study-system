import { TokenExpiredError, UnauthorizedError } from 'domain/entities/error'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

export const verifyToken = (req: Request, _: Response, next: NextFunction) => {
  const token = req.signedCookies?.token

  jwt.verify(token, JWT_SECRET as string, (err: any) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        throw new TokenExpiredError('Session expired')
      } else {
        throw new UnauthorizedError('Invalid authentication')
      }
    } else {
      next()
    }
  })
}
