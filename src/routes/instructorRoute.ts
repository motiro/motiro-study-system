import { authMiddleware } from 'applications/middlewares'
import { Router } from 'express'

import { InstructorUseCase } from 'applications/usecases/InstructorUseCase'
import { InstructorController } from '../applications/controllers/instructorController'
import { MongoInstructorRepository } from '@mongo/mongoInstructorRepository'
import { verifyToken } from 'applications/middlewares/verifyTokenMiddleware'

const mongoRepository = new MongoInstructorRepository()
const instructorUseCase = new InstructorUseCase(mongoRepository)
const instructorController = new InstructorController(instructorUseCase)

const router = Router()

router
  .route('/instructor')
  .all(verifyToken, authMiddleware.authUser)
  .post((req, res) => instructorController.create(req, res))
  .get((req, res) => instructorController.listAll(req, res))

router
  .route('/instructor/:id')
  .all(verifyToken, authMiddleware.authUser)
  .get((req, res) => instructorController.listOne(req, res))
  .patch((req, res) => instructorController.update(req, res))
  .delete((req, res) => instructorController.delete(req, res))

export default router
