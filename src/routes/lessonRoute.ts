import { Router } from 'express'
import { MongoLessonRepository, MongoStudentRepository, MongoInstructorRepository} from '@mongo/.'
import { LessonUseCase, InstructorUseCase, StudentUseCase } from 'applications/usecases'
import { LessonController } from 'applications/controllers'
import { authMiddleware } from 'applications/middlewares'

const instructorRepository = new MongoInstructorRepository()
const instructorUseCase = new InstructorUseCase(instructorRepository)

const studentRepository = new MongoStudentRepository()
const studentUseCase = new StudentUseCase(studentRepository)

const mongoRepository = new MongoLessonRepository()
const lessonUseCase = new LessonUseCase(mongoRepository, instructorUseCase, studentUseCase)
const lessonController = new LessonController(lessonUseCase)
const router = Router()

router
  .route('/lesson')
  .all(authMiddleware.authUser)
  .get(lessonController.listAll) // All lessons from all instructors?
router
  .route('/lesson')
  .all(authMiddleware.authUser)
  .post(lessonController.create)
router
  .route('/lesson/:id')
  .all(authMiddleware.authUser)
  .get(lessonController.listOne)
  .get(lessonController.listAll) // Perhaps verify if id exists in params and return all lessons from a specific instructor?
  .delete(lessonController.delete)

export default router
