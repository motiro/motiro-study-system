import { Request, Response } from 'express'
import { AdminUseCase } from 'applications/usecases/adminUseCase'

export class AdminController {
  constructor(private useCase: AdminUseCase) {}
  create = async (req: Request, res: Response) => {
    const id = req.params.id
    const { name, email, password } = req.body

    const result = await this.useCase.create({
      id,
      name,
      email,
      password
    })

    return res.status(201).json(result)
  }

  listOne = async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await this.useCase.listOne(id)
    return res.status(200).json(result)
  }

  listAll = async (_: Request, res: Response) => {
    const result = await this.useCase.listAll()
    return res.status(200).json(result)
  }

  update = async (req: Request, res: Response) => {
    const id = req.params.id
    const { name, email, password } = req.body

    await this.useCase.update({
      id,
      name,
      email,
      password
    })

    return res.status(200).send()
  }

  delete = async (req: Request, res: Response) => {
    const id = req.params.id
    await this.useCase.delete(id)
    return res.status(200).send()
  }
}
