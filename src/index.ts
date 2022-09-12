import * as swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

import express from "express";
import productRouter from "./routers/product";

// Either listen at PORT 3000 or the environment variable PORT.
const PORT = process.env.PORT || 3000;

// Create a new express application instance.
const app = express();

// Creates a new swagger instance at /documentation.
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Parse JSON bodies.
app.use(express.json());

// Register the product router.
app.use("/products", productRouter);

// Start the server.
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
