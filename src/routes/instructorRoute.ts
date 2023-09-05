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
  .route('/')
  .all(authMiddleware.authUser)
  .post(instructorController.createInstructor)
  .get(instructorController.getAllInstructors)

router
  .route('/:id')
  .all(authMiddleware.authUser)
  .get(instructorController.getInstructor)
  .patch(instructorController.updateInstructor)
  .delete(instructorController.deleteInstructor)

export default router
