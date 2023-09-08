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
  .post(authMiddleware.checkRole('admin'), (req, res) =>
    studentController.create(req, res)
  )
  .get(authMiddleware.checkRole('admin', 'instructor'), (req, res) =>
    studentController.listAll(req, res)
  )

router
  .route('/student/:id')
  .all(authMiddleware.authUser)
  .get((req, res) => studentController.listOne(req, res))
  .patch((req, res) => studentController.update(req, res))
  .delete((req, res) => studentController.delete(req, res))

export default router
