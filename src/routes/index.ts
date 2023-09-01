import { Router } from 'express'
import authRoute from './authRoutes'
import adminRoute from './adminRoute'
import instructorRoute from './instructorRoute'
import studentRoute from './studentsRoute'

const router = Router()

router.use('/api/v1', authRoute)
router.use('/api/v1', adminRoute)
router.use('/api/v1/instructor', instructorRoute)
router.use('/api/v1/student', studentRoute)

export default router
