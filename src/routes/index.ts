import express from 'express'
import adminRoute from './adminRoute'
import instructorRoute from './instructorRoute'

const routes = express()
routes.use('/api/v1', adminRoute)
routes.use('/api/v1/instructor', instructorRoute)

export default routes
