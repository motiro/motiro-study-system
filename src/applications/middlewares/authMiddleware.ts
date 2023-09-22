import { Request, Response, NextFunction } from 'express'
import { jwt, User } from '@jwt'
import { Types } from 'mongoose'
import { UnauthorizedError, ForbiddenError } from 'domain/entities'

class AuthMiddleware {
  public authUser = (req: Request, _: Response, next: NextFunction) => {
    const token = req.signedCookies?.token
    if (!token) throw new UnauthorizedError('Not logged in')

    try {
      const { name, role, id } = jwt.decode(token) as User
      req.body.user = { name, role, id }
      next()
    } catch (error) {
      throw new UnauthorizedError('Invalid authentication')
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
    requestUser: { user: { role: string; id: string } },
    resourceId: Types.ObjectId | string
  ) => {
    if (requestUser.user?.role === 'admin') return
    if (requestUser.user?.id === resourceId.toString()) return
    throw new ForbiddenError('Access denied')
  }
}

export const authMiddleware = new AuthMiddleware()
