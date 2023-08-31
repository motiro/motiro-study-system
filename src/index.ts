import express from 'express'
import router from './routes'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import './infrastructure/persistence/mongo/connections'

const app = express()

const { PORT, COOKIE_SECRET } = process.env
const port = PORT || 5000

app.use(express.json())
app.use(router)

app.use(cookieParser(COOKIE_SECRET))

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
