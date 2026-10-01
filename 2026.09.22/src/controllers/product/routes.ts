import { Router } from "express";
import { getProduct, setProduct } from "./controller.ts";  

const router: Router = Router();
router.get("/products", getProduct);
router.post("/product", setProduct);

export default router;