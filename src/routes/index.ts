import { Router } from 'express'
import authRoutes from './authRoutes'
import instructorRoute from './instructorRoute'
import studentRoute from './studentRoute'

const router = Router()

router.use('/api/v1', authRoutes)
router.use('/api/v1/instructor', instructorRoute)
router.use('/api/v1/student', studentRoute)

export default router
