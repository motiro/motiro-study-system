import { Request, Response } from 'express'
import { LessonUseCase } from 'applications/usecases/lessonUseCase'

export class LessonController {
  constructor(private useCase: LessonUseCase) {}
  create = async (req: Request, res: Response) => {
    const { instructor, student, date } = req.body

    const result = await this.useCase.create({
      instructor,
      student,
      date
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
    const { instructor, student, date } = req.body

    await this.useCase.update({
      id,
      instructor,
      student,
      date
    })

    return res.status(200).send()
  }

  delete = async (req: Request, res: Response) => {
    const id = req.params.id
    await this.useCase.delete(id)
    return res.status(200).send()
  }
}
