import { Router } from 'express'
import { authController } from 'applications/controllers'

const router = Router()

router.post('/auth/register', (req, res) => authController.register(req, res))
router.post('/auth/login', authController.login)
router.get('/auth/logout', authController.logout)

export default router
