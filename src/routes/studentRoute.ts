import { Router } from 'express'
import studentController from 'applications/controllers/studentController'
import { authMiddleware } from 'applications/middlewares/authMiddleware'

const router = Router()

router.post(
  '/',
  authMiddleware.authUser,
  authMiddleware.checkRole('admin'),
  studentController.create
)
router.patch('/:id', authMiddleware.authUser, studentController.update)
router.get(
  '/',
  authMiddleware.authUser,
  authMiddleware.checkRole('admin', 'instructor'),
  studentController.list
)
router.get('/:id', authMiddleware.authUser, studentController.listStudent)
router.delete('/:id', authMiddleware.authUser, studentController.delete)

export default router
