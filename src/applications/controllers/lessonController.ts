import { Request, Response } from 'express'
import { LessonUseCase } from 'applications/usecases/lessonUseCase'
import { UploadedFile } from 'express-fileupload'

export class LessonController {
  constructor(private useCase: LessonUseCase) {}
  create = async (req: Request, res: Response) => {
    const { instructor, student, date } = req.body

    const result = await this.useCase.create(req.body)

    return res.status(201).json(result)
  }

  file = async (req: Request, res: Response) => {
    const id = req.params.id
    if (!req.files) {
      throw new Error('No file')
    }
    const textFile = req.files?.textFile as UploadedFile
    const result = await this.useCase.file({ id, textFile })

    return res.status(200).json(result)
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

  delete = async (req: Request, res: Response) => {
    const id = req.params.id
    await this.useCase.delete(id)
    return res.status(200).send()
  }
}
