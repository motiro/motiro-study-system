import express from 'express'
import { uploadController } from './../applications/controllers/uploadController'

const router = express.Router()

router.post('/upload', uploadController.handleUpload)

export default router