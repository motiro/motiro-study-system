import { Request, Response } from 'express'
import { AuthUseCase } from 'applications/usecases'
import { jwt } from '@jwt/.'

export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  register = async (req: Request, res: Response) => {
    const tokenUser = await this.authUseCase.register(req)
    const token = req.signedCookies?.token
    if (!token) jwt.attachCookies({ res, user: tokenUser })
    res.status(201).json(tokenUser)
  }

  login = async (req: Request, res: Response) => {
    const userToken = await this.authUseCase.login(req)
    jwt.attachCookies({ res, user: userToken })
    res.status(200).json(userToken)
  }

  logout = (_: Request, res: Response) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date()
    })
    res.status(200).send()
  }
}
