import express from 'express'
import 'dotenv/config'

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})