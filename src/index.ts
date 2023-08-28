import express from 'express'
import 'dotenv/config'
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
