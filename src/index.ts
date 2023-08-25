import express from 'express'
import 'dotenv/config'
import './infrastructure/persistence/mongo/connections'

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
