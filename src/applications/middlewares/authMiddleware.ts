import { Request, Response, NextFunction } from 'express'
import { jwt, User } from '@jwt/.'
import { Types } from 'mongoose'
import { UnauthorizedError, ForbiddenError } from 'domain/entities/error'

class AuthMiddleware {
  public authUser = (req: Request, _: Response, next: NextFunction) => {
    const token = req.signedCookies?.token
    if (!token) throw new UnauthorizedError('Not logged in')

    try {
      const { userId, name, role } = jwt.decode(token) as User
      req.body.user = { userId, name, role }
      next()
    } catch (error) {
      throw new UnauthorizedError('Invalid authentication token')
    }
  }

  public checkRole = (...roles: string[]) => {
    return (req: Request, _: Response, next: NextFunction) => {
      if (!roles.includes(req.body.user?.role))
        throw new ForbiddenError('Access denied')
      next()
    }
  }

  public checkUserPermissions = (
    requestUser: { user: { role: string; userId: string } },
    resourceUserId: Types.ObjectId | string
  ) => {
    if (requestUser.user?.role === 'admin') return
    if (requestUser.user?.userId === resourceUserId.toString()) return
    throw new ForbiddenError('Access denied')
  }
}

export const authMiddleware = new AuthMiddleware()
