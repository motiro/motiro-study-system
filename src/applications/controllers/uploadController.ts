import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import { uploadUseCase } from './../usecases/uploadUseCase'

export const uploadController = {
  handleUpload: (req: Request, res: Response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Nenhum arquivo foi enviado.')
    }

    let sampleFile = req.files.sampleFile as UploadedFile

    uploadUseCase.processFile(sampleFile)
      .then(() => res.send('Arquivo enviado!'))
      .catch(err => res.status(500).send(err))
  }
}
