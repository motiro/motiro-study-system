import { authMiddleware } from 'applications/middlewares'
import { Router } from 'express'

import { InstructorUseCase } from 'applications/usecases/InstructorUseCase'
import { InstructorController } from '../applications/controllers/instructorController'
import { MongoInstructorRepository } from '@mongo/mongoInstructorRepository'

const mongoRepository = new MongoInstructorRepository()
const instructorUseCase = new InstructorUseCase(mongoRepository)
const instructorController = new InstructorController(instructorUseCase)

const router = Router()

router
  .route('/instructor')
  .all(authMiddleware.authUser)
  .post(instructorController.create)
  .get(instructorController.listAll)

router
  .route('/instructor/:id')
  .all(authMiddleware.authUser)
  .get(instructorController.listOne)
  .patch(instructorController.update)
  .delete(instructorController.delete)

export default router
