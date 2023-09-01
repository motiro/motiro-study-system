import { Request, Response, NextFunction } from 'express'
import { jwt, User } from '@jwt/.'
import { Types } from 'mongoose'
import { UnauthorizedError } from 'domain/entities/error'

class AuthMiddleware {
  authUser(req: Request, _: Response, next: NextFunction) {
    const token = req.signedCookies.token

    if (!token) {
      throw new UnauthorizedError('Invalid authentication')
    }

    try {
      const { userId, name, role } = jwt.decode(token) as User
      req.body.user = { userId, name, role }
      next()
    } catch (error) {
      throw new UnauthorizedError('Invalid authentication')
    }
  }

  checkRole(...roles: string[]) {
    return (req: Request, _: Response, next: NextFunction) => {
      if (!roles.includes(req.body.user.role)) {
        throw new UnauthorizedError('Unauthorized')
      }
      next()
    }
  }

  checkUserPermissions(
    requestUser: { user: { role: string; userId: string } },
    resourceUserId: Types.ObjectId | string
  ) {
    if (requestUser.user.role === 'admin') return
    if (requestUser.user.userId === resourceUserId.toString()) return
    throw new UnauthorizedError('Unauthorized')
  }
}

export const authMiddleware = new AuthMiddleware()
