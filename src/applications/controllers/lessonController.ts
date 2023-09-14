import { Request, Response } from 'express'
import { LessonUseCase } from 'applications/usecases/lessonUseCase'
import { UploadedFile } from 'express-fileupload'
import { BadRequestError } from 'domain/entities'

export class LessonController {
  constructor(private useCase: LessonUseCase) {}
  async create(req: Request, res: Response) {
    const result = await this.useCase.create(req.body)

    return res.status(201).json(result)
  }

  async uploadFile(req: Request, res: Response) {
    const id = req.params?.id
    if (!id) throw new BadRequestError('Invalid ID')
    if (!req.body.user?.id) throw new BadRequestError('Invalid authentication')
    if (!req.files || !req.files?.document)
      throw new Error('No file was uploaded')

    const textFile: UploadedFile | UploadedFile[] = req.files.document

    await this.useCase.uploadFile({
      lessonId: id,
      userId: req.body.user?.id,
      textFile: textFile
    })

    return res.status(200).json()
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
