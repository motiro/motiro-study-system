import { StudentUseCase } from 'applications/usecases/studentUseCase'
import { StudentController } from 'applications/controllers/studentController'
import { MongoRepository } from './../infrastructure/persistence/mongo/mongoRepository'
import { Router } from 'express'
import { authMiddleware } from 'applications/middlewares/authMiddleware'

const mongoRepository = new MongoRepository()
const studentUseCase = new StudentUseCase(mongoRepository)
const studentController = new StudentController(studentUseCase)

const router = Router()

router
  .route('/')
  .all(authMiddleware.authUser)
  .post(authMiddleware.checkRole('admin'), studentController.create)
  .get(authMiddleware.checkRole('admin', 'instructor'), studentController.list)

router
  .route('/:id')
  .all(authMiddleware.authUser)
  .get(studentController.listStudent)
  .patch(studentController.update)
  .delete(studentController.delete)

export default router
