// A termék útvonalak kezelőfüggvényei (controller): ezek döntik el, mit válaszol a szerver egy kérésre
import type { Request, Response } from "express";
import data from "../../app/data/data.ts"
import { Product, type IProduct } from "./product.ts"


// GET /product/products -> visszaküldi az összes terméket a data.ts-ből
export const getProduct = (_req: Request, res: Response) => {
    res.send(
        data
    )
}

// POST /product/product -> a kérés törzséből (req.body) létrehoz egy Product objektumot,
// és visszaküldi JSON-ként (a hiányzó mezőket a konstruktor alapértékkel tölti ki, de nem menti el sehova)
export const setProduct = (req: Request, res: Response) => {
    const product: Product = new Product(req.body)
    res.send(product.toJSON())
}




