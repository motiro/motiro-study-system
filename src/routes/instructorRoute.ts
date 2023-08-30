import { Router } from 'express'
import { InstructorController } from '../applications/controller/instructorController'

const instructorController = new InstructorController()
const router = Router()
router.route('/').post(instructorController.createInstructor)
router.route('/').get(instructorController.getAllInstructors)
router
  .route('/:id')
  .get(instructorController.getInstructor)
  .patch(instructorController.updateInstructor)
  .delete(instructorController.deleteInstructor)

export default router
