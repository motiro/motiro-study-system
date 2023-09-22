import { jwt } from '@jwt'
import { AuthUseCase } from '@usecases'
import { Request, Response } from 'express'

export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  async register(req: Request, res: Response) {
    const tokenUser = await this.authUseCase.register(req)
    const token = req.signedCookies?.token
    if (!token) jwt.attachCookies({ res, user: tokenUser })
    res.status(201).json(tokenUser)
  }

  async login(req: Request, res: Response) {
    const userToken = await this.authUseCase.login(req)
    jwt.attachCookies({ res, user: userToken })
    res.status(200).json(userToken)
  }

  logout(_: Request, res: Response) {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date()
    })
    res.status(200).send()
  }
}
