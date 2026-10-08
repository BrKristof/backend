// A termék útvonalai. Az app.ts a "/product" elé csatolja, ezért a teljes címek:
// GET /product/products és POST /product/product
import { Router } from "express";
import { getProduct, setProduct, getProductbyID, updateProduct, updateProductPatch, deleteProduct } from "./controller.ts";

const router: Router = Router();
router.get("/products", getProduct); // összes termék lekérése
router.get("/product/:id", getProductbyID); // egy termék lekérése ID alapján
router.post("/product", setProduct); // új termék "létrehozása" (csak visszaküldi)
router.put("/product/:id", updateProduct); // meglévő termék frissítése ID alapján
router.patch("/product/:id", updateProductPatch); // meglévő termék részleges frissítése ID alapján
router.delete("/product/:id", deleteProduct); // meglévő termék törlése ID alapján


export default router;
