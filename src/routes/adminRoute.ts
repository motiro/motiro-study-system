import { Router } from 'express'
import { MongoRepository } from '@mongo/mongoRepository'
import { AdminUseCase } from 'applications/usecases/adminUseCase'
import { AdminController } from 'applications/controllers/adminController'
import { authMiddleware } from 'applications/middlewares'

const mongoRepository = new MongoRepository()
const adminUseCase = new AdminUseCase(mongoRepository)
const adminController = new AdminController(adminUseCase)
const router = Router()

router
  .route('/admin')
  .all(authMiddleware.authUser, authMiddleware.checkRole('admin'))
  .get(adminController.listAll)
  .post(adminController.create)
router
  .route('/admin/:id')
  .all(authMiddleware.authUser, authMiddleware.checkRole('admin'))
  .get(adminController.listOne)
  .patch(adminController.update)
  .delete(adminController.delete)

export default router
