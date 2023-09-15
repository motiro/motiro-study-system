import { Router } from 'express'
import { authMiddleware } from 'applications/middlewares'
import { LessonController } from 'applications/controllers'
import {
  MongoLessonRepository,
  MongoStudentRepository,
  MongoInstructorRepository
} from '@mongo/.'
import {
  LessonUseCase,
  InstructorUseCase,
  StudentUseCase
} from 'applications/usecases'
import { verifyToken } from 'applications/middlewares/verifyTokenMiddleware'

const instructorRepository = new MongoInstructorRepository()
const instructorUseCase = new InstructorUseCase(instructorRepository)

const studentRepository = new MongoStudentRepository()
const studentUseCase = new StudentUseCase(studentRepository)

const mongoRepository = new MongoLessonRepository()
const lessonUseCase = new LessonUseCase(
  mongoRepository,
  instructorUseCase,
  studentUseCase
)
const lessonController = new LessonController(lessonUseCase)

const router = Router()

router
  .route('/lesson')
  .all(verifyToken, authMiddleware.authUser)
  .get((req, res) => lessonController.listAll(req, res))
  .post((req, res) => lessonController.create(req, res))
router
  .route('/lesson/:id')
  .all(verifyToken, authMiddleware.authUser)
  .get((req, res) => lessonController.listOne(req, res))
  .delete((req, res) => lessonController.delete(req, res))
router
  .route('/lesson/:id/upload')
  .all(verifyToken, authMiddleware.authUser)
  .post((req, res) => lessonController.uploadFile(req, res))

export default router
