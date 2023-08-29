import authRoutes from './authRoutes'
import { Router } from 'express'

const router = Router()

router.use('/api/v1', authRoutes)

export default router
