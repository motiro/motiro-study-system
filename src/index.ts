import express from 'express'
import 'express-async-errors'
import 'dotenv/config'
import '@mongo/connections'
import routes from './routes'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { notFoundMiddleware, errorMiddleware } from 'applications/middlewares/.'

const { PORT, COOKIE_SECRET } = process.env
const port = PORT || 5000
const app = express()

app.use(cookieParser(COOKIE_SECRET))
app.use(express.json())
app.use(fileUpload())
app.use(routes)
app.use(notFoundMiddleware)
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
