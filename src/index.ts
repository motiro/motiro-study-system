import express from 'express'
import router from './routes'
import cookieParser from 'cookie-parser'
import './infrastructure/persistence/mongo/connections'
import 'dotenv/config'

const { PORT, COOKIE_SECRET } = process.env
const port = PORT || 5000
const app = express()

app.use(cookieParser(COOKIE_SECRET))
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
