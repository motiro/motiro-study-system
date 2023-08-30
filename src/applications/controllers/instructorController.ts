import { Request, Response } from 'express'
import { InstructorUseCase } from 'applications/usecases/InstructorUseCase'
import { authMiddleware } from 'applications/middlewares'

export class InstructorController {
  constructor(private useCase: InstructorUseCase) {}
  createInstructor = async (req: Request, res: Response) => {
    try {
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
    } catch (err) {
      if (err instanceof Error) {
        return res
          .status(400)
          .json({ message: err.message || 'Unexpected error.' })
      }
      return res.status(500).json({ message: 'Unexpected error.' })
    }
  }
  getAllInstructors = async (req: Request, res: Response) => {
    try {
      const result = await this.useCase.list()

      return res.status(200).json(result)
    } catch (err) {
      if (err instanceof Error) {
        return res
          .status(400)
          .json({ message: err.message || 'Unexpected error.' })
      }
      return res.status(500).json({ message: 'Unexpected error.' })
    }
  }

  getInstructor = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const result = await this.useCase.listOne(id)

      authMiddleware.checkUserPermissions(req.body, id)
      return res.status(200).send(result)
    } catch (err) {
      if (err instanceof Error) {
        return res
          .status(400)
          .json({ message: err.message || 'Unexpected error.' })
      }
      return res.status(500).json({ message: 'Unexpected error.' })
    }
  }
  updateInstructor = async (req: Request, res: Response) => {
    try {
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
    } catch (err) {
      if (err instanceof Error) {
        return res
          .status(400)
          .json({ message: err.message || 'Unexpected error.' })
      }
      return res.status(500).json({ message: 'Unexpected error.' })
    }
  }
  deleteInstructor = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      authMiddleware.checkUserPermissions(req.body, id)
      await this.useCase.delete(id)

      return res.status(200).send()
    } catch (err) {
      if (err instanceof Error) {
        return res
          .status(400)
          .json({ message: err.message || 'Unexpected error.' })
      }
      return res.status(500).json({ message: 'Unexpected error.' })
    }
  }
}
