import { Request, Response } from 'express'
import { InstructorUseCase } from 'applications/usecases/InstructorUseCase'
import { authMiddleware } from 'applications/middlewares'

export class InstructorController {
  constructor(private useCase: InstructorUseCase) {}
  createInstructor = async (req: Request, res: Response) => {
    const { id, name, email, password, specialty, schedule } = req.body

    const result = await this.useCase.execute({
      id,
      name,
      email,
      password,
      specialty,
      schedule
    })
    return res.status(201).json(result)
  }
  getAllInstructors = async (req: Request, res: Response) => {
    const result = await this.useCase.list()

    return res.status(200).json(result)
  }

  getInstructor = async (req: Request, res: Response) => {
    const { id } = req.params

    authMiddleware.checkUserPermissions(req.body, id)
    const result = await this.useCase.listOne(id)

    return res.status(200).send(result)
  }
  updateInstructor = async (req: Request, res: Response) => {
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
  deleteInstructor = async (req: Request, res: Response) => {
    const { id } = req.params

    authMiddleware.checkUserPermissions(req.body, id)
    await this.useCase.delete(id)

    return res.status(200).send()
  }
}
