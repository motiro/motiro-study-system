import express from 'express'
import router from './routes'
import 'dotenv/config'

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
