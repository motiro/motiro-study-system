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
  .all(authMiddleware.authUser)
  .get((req, res) => lessonController.listAll(req, res))
  .post((req, res) => lessonController.create(req, res))
router
  .route('/lesson/:id')
  .all(authMiddleware.authUser)
  .post((req, res) => lessonController.file(req, res))
  .get((req, res) => lessonController.listOne(req, res))
  .delete((req, res) => lessonController.delete(req, res))

export default router
