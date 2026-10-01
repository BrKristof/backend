// A termék útvonalai. Az app.ts a "/product" elé csatolja, ezért a teljes címek:
// GET /product/products és POST /product/product
import { Router } from "express";
import { getProduct, setProduct } from "./controller.ts";

const router: Router = Router();
router.get("/products", getProduct); // összes termék lekérése
router.post("/product", setProduct); // új termék "létrehozása" (csak visszaküldi)

export default router;
