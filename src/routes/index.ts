import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "swagger.json"

const routes = express()
routes.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export default routes