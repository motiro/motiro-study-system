import { Request, Response } from 'express'
import { LessonUseCase } from 'applications/usecases/lessonUseCase'

export class LessonController {
  constructor(private useCase: LessonUseCase) {}
  async create(req: Request, res: Response) {
    const { instructor, student, date } = req.body

    const result = await this.useCase.create({
      instructor,
      student,
      date
    })

    return res.status(201).json(result)
  }

  async listOne(req: Request, res: Response) {
    const id = req.params.id
    const result = await this.useCase.listOne(id)
    return res.status(200).json(result)
  }

  async listAll(_: Request, res: Response) {
    const result = await this.useCase.listAll()
    return res.status(200).json(result)
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id
    await this.useCase.delete(id)
    return res.status(200).send()
  }
}
