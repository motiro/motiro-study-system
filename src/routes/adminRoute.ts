import { Router } from 'express'
import { AdminUseCase } from 'applications/usecases'
import { AdminController } from 'applications/controllers'
import { authMiddleware } from 'applications/middlewares'
import { MongoAdminRepository } from '@mongo/mongoAdminRepository'

const mongoRepository = new MongoAdminRepository()
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
