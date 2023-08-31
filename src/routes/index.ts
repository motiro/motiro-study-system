import { Router } from 'express'
import authRoutes from './authRoutes'
import instructorRoute from './instructorRoute'

const router = Router()

router.use('/api/v1', authRoutes)
router.use('/api/v1/instructor', instructorRoute)

export default router
