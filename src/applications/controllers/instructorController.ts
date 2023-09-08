import { Request, Response } from 'express'
import { InstructorUseCase } from 'applications/usecases/InstructorUseCase'
import { authMiddleware } from 'applications/middlewares'

export class InstructorController {
  constructor(private useCase: InstructorUseCase) {}
  async create(req: Request, res: Response) {
    const { id, name, email, password, specialty, schedule } = req.body

    const result = await this.useCase.create({
      id,
      name,
      email,
      password,
      specialty,
      schedule
    })
    return res.status(201).json(result)
  }
  async listAll(req: Request, res: Response) {
    const result = await this.useCase.listAll()

    return res.status(200).json(result)
  }

  async listOne(req: Request, res: Response) {
    const { id } = req.params

    authMiddleware.checkUserPermissions(req.body, id)
    const result = await this.useCase.listOne(id)

    return res.status(200).send(result)
  }
  async update(req: Request, res: Response) {
    const { name, email, password, specialty, schedule } = req.body
    const { id } = req.params

    authMiddleware.checkUserPermissions(req.body, id)
    const result = await this.useCase.update(id, {
      name,
      email,
      password,
      specialty,
      schedule
    })

    return res.status(200).json(result)
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params

    authMiddleware.checkUserPermissions(req.body, id)
    await this.useCase.delete(id)

    return res.status(200).send()
  }
}
