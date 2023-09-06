import { StudentUseCase } from 'applications/usecases/studentUseCase'
import { StudentController } from 'applications/controllers/studentController'
import { MongoStudentRepository } from '@mongo/mongoStudentRepository'
import { Router } from 'express'
import { authMiddleware } from 'applications/middlewares/authMiddleware'

const studentRepository = new MongoStudentRepository()
const studentUseCase = new StudentUseCase(studentRepository)
const studentController = new StudentController(studentUseCase)

const router = Router()

router
  .route('/student')
  .all(authMiddleware.authUser)
  .post(authMiddleware.checkRole('admin'), studentController.create)
  .get(
    authMiddleware.checkRole('admin', 'instructor'),
    studentController.listAll
  )

router
  .route('/student/:id')
  .all(authMiddleware.authUser)
  .get(studentController.listOne)
  .patch(studentController.update)
  .delete(studentController.delete)

export default router
