import express from 'express'
import 'dotenv/config'
import './infrastructure/persistence/mongo/connections'
import routes from './routes'
import { errorMiddleware } from 'applications/middlewares/errorMiddleware'

const app = express()

const { PORT } = process.env
const port = PORT || 5000

// app.use(cookieParser(COOKIE_SECRET))
app.use(express.json())
app.use(routes)
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
