import { Router } from 'express'
import authRoutes from './authRoutes'

const router = Router()

router.use('/api/v1', authRoutes)

export default router
