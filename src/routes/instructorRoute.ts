import { Router } from 'express'

import { InstructorUseCase } from 'applications/usecases/InstructorUseCase'
import { InstructorController } from '../applications/controllers/instructorController'
import { MongoRepository } from '../infrastructure/persistence/mongo/mongoRepository'

const mongoRepository = new MongoRepository()
const instructorUseCase = new InstructorUseCase(mongoRepository)
const instructorController = new InstructorController(instructorUseCase)

const router = Router()

router.route('/').post(instructorController.createInstructor)
router.route('/').get(instructorController.getAllInstructors)
router
  .route('/:id')
  .get(instructorController.getInstructor)
  .patch(instructorController.updateInstructor)
  .delete(instructorController.deleteInstructor)

export default router
