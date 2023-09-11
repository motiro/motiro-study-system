import { Router } from 'express'
import { MongoLessonRepository } from '@mongo/mongoLessonRepository'
import { LessonUseCase } from 'applications/usecases'
import { LessonController } from 'applications/controllers'
import { authMiddleware } from 'applications/middlewares'

const mongoRepository = new MongoLessonRepository()
const lessonUseCase = new LessonUseCase(mongoRepository)
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
