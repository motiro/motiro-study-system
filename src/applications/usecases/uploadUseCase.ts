import { UploadedFile } from 'express-fileupload'

export const uploadUseCase = {
  processFile: (file: UploadedFile) => {
    return new Promise((resolve, reject) => {
      file.mv('../../../public', function(err) {
        if (err) {
          reject(err)
        } else {
          resolve("")
        }
      })
    })
  }
}