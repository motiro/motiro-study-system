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
  .get((req, res) => adminController.listAll(req, res))
  .post((req, res) => adminController.create(req, res))
router
  .route('/admin/:id')
  .all(authMiddleware.authUser, authMiddleware.checkRole('admin'))
  .get((req, res) => adminController.listOne(req, res))
  .patch((req, res) => adminController.update(req, res))
  .delete((req, res) => adminController.delete(req, res))

export default router
