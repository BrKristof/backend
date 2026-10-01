import express from "express";
import router from "../routes/routes.ts";
import productRoutes from "../controllers/product/routes.ts";
//import bodyParser from "body-parser";

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use("/", router)
app.use("/product", productRoutes)
//app.use(bodyParser.urlencoded({ extended: true }))

export default app 