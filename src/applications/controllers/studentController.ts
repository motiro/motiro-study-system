import { Request, Response } from 'express'
import { authMiddleware } from 'applications/middlewares/authMiddleware'
import { StudentUseCase } from 'applications/usecases/studentUseCase'

export class StudentController {
  constructor(private useCase: StudentUseCase) {}

  create = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const result = await this.useCase.create({ name, email, password })

    return res.status(201).json(result)
  }

  update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, email, password } = req.body

    authMiddleware.checkUserPermissions(req.body, id)

    const result = await this.useCase.update(id, { name, email, password })

    return res.status(200).json(result)
  }

  listAll = async (_: Request, res: Response) => {
    const students = await this.useCase.listAll()

    return res.status(200).json(students)
  }

  listOne = async (req: Request, res: Response) => {
    const { id } = req.params
    authMiddleware.checkUserPermissions(req.body, id)

    const result = await this.useCase.listOne(id)

    return res.status(200).json(result)
  }

  delete = async (req: Request, res: Response) => {
    const { id } = req.params

    authMiddleware.checkUserPermissions(req.body, id)

    await this.useCase.delete(id)

    return res.status(200).send()
  }
}
