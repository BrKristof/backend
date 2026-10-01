// Az Express alkalmazás összerakása: middleware-ek és útvonalak (route-ok) beállítása.
// Itt csak létrehozzuk az app-ot, elindítani (listen) a server.ts fogja.
import express from "express";
import router from "../routes/routes.ts"; // általános útvonalak (pl. GET /)
import productRoutes from "../controllers/product/routes.ts"; // termékekkel kapcsolatos útvonalak
//import bodyParser from "body-parser";

const app = express()
app.use(express.json()) // a JSON formátumú kérés törzsét (body) feldolgozza -> req.body
app.use(express.urlencoded()) // a HTML űrlapból (form) küldött adatokat dolgozza fel -> req.body
app.use("/", router) // a "/" alá csatolja az általános útvonalakat
app.use("/product", productRoutes) // a "/product" elé csatolja a termék útvonalakat (pl. /product/products)
//app.use(bodyParser.urlencoded({ extended: true }))

export default app // exportálja, hogy a server.ts be tudja importálni
