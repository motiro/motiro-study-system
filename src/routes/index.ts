import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from 'swagger.json'
import authRoute from './authRoute'
import adminRoute from './adminRoute'
import instructorRoute from './instructorRoute'
import studentRoute from './studentRoute'

const router = Router()

router.use('/api/v1', authRoute)
router.use('/api/v1', adminRoute)
router.use('/api/v1', instructorRoute)
router.use('/api/v1', studentRoute)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export default router
