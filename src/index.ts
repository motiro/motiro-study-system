import express from 'express'

import studentsRoute from './routes/studentsRoute'
import 'dotenv/config'

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

const routes = express()
routes.use('/api/v1/student', studentsRoute)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
