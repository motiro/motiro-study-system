import { Request, Response } from 'express'
import { model } from 'mongoose'
import { jwt, User } from '@jwt/.'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError
} from 'domain/entities/error'

enum models {
  admin = 'Admin',
  instructor = 'Instructor',
  student = 'Student'
}

class AuthController {
  private async isFirstAdminAccount() {
    const documents = await model(models.admin).countDocuments({})
    return documents === 0
  }

  private isAdminRole(token: string) {
    if (!token) throw new UnauthorizedError('Unauthorized')
    const { role } = jwt.decode(token) as User
    return role === 'admin'
  }

  private getModel(req: Request) {
    const reqRole = req.body?.role
    if (!reqRole) throw new BadRequestError('Missing role')
    const userModel =
      reqRole.charAt(0).toUpperCase() + reqRole.slice(1).toLowerCase()
    if (!Object.values(models).includes(userModel))
      throw new BadRequestError('Invalid role')
    return { userModel, reqRole }
  }

  private async getUser(email: string) {
    for (const m of Object.values(models)) {
      try {
        const user = await model(m).findOne({ email })
        if (user) return user
      } catch (error) {
        console.log(error)
      }
    }
  }

  public register = async (req: Request, res: Response) => {
    const { userModel, reqRole } = this.getModel(req)
    const { name, email, password, specialty, schedule } = req.body
    const token = req.signedCookies?.token

    if (reqRole === 'admin') {
      if (!(await this.isFirstAdminAccount()) && !this.isAdminRole(token))
        throw new ForbiddenError('Access denied')
    }

    const emailAlreadyExists = await this.getUser(email)
    if (emailAlreadyExists)
      throw new BadRequestError('E-mail already registered')

    const user = await model(userModel).create({
      name,
      email,
      password,
      specialty,
      schedule
    })

    const tokenUser = jwt.createUserToken(user as unknown as User)
    if (!token) jwt.attachCookies({ res, user: tokenUser })

    res.status(201).json(tokenUser)
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) throw new BadRequestError('Missing credentials')

    const user = await this.getUser(email)
    if (!user) throw new NotFoundError('User not found')

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) throw new BadRequestError('Invalid password')

    const userToken = jwt.createUserToken(user as unknown as User)
    jwt.attachCookies({ res, user: userToken })

    res.status(200).json(userToken)
  }

  public logout = (_: Request, res: Response) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date()
    })
    res.status(200).send()
  }
}

export default new AuthController()
