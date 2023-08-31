import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import './infrastructure/persistence/mongo/connections'
import routes from './routes'

const app = express()

const { PORT, COOKIE_SECRET } = process.env
const port = PORT || 5000

app.use(express.json())
app.use(cookieParser(COOKIE_SECRET))
app.use(routes)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
