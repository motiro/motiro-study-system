import express from 'express'
import 'dotenv/config'
import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
