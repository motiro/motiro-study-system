import instructorRoute from './instructorRoute'
import express from 'express'

const routes = express()
routes.use('/api/v1/instructor', instructorRoute)

export default routes
