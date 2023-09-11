import { Router } from 'express'
import { LessonController } from 'applications/controllers'
import { authMiddleware } from 'applications/middlewares'
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
  .get((req, res) => lessonController.listOne(req, res))
  .get((req, res) => lessonController.listAll(req, res)) // Perhaps verify if id exists in params and return all lessons from a specific instructor?
  .delete((req, res) => lessonController.delete(req, res))

export default router
