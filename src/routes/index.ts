import instructorRoute from './instructorRoute'
import studentRoutes from './studentsRoute'
import express from 'express'

const routes = express()
routes.use('/api/v1/instructor', instructorRoute)
routes.use('/api/v1/student', studentRoute)

export default routes
