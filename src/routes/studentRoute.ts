import { Router } from 'express'
import studentController from 'applications/controllers/studentController'
import { authMiddleware } from 'applications/middlewares/authMiddleware'

const router = Router()

router.post(
  '/student',
  authMiddleware.authUser,
  authMiddleware.checkRole('admin'),
  studentController.create
)
router.patch('/:id', authMiddleware.authUser, studentController.update)
router.get(
  '/student',
  authMiddleware.authUser,
  authMiddleware.checkRole('admin', 'instructor'),
  studentController.listAll
)
router.get('/student/:id', authMiddleware.authUser, studentController.listOne)
router.delete('/student/:id', authMiddleware.authUser, studentController.delete)

export default router
