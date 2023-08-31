import express from 'express'

import studentsRoute from './routes/studentsRoute'
import 'dotenv/config'
import './infrastructure/persistence/mongo/connections'
import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)
const port = process.env.PORT || 5000

const routes = express()
routes.use('/api/v1/student', studentsRoute)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
