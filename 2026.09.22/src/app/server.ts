import express from "express";
import { Request,Response } from "express";
import path from "path";
import data from "./data/data.ts"
const app = express()

app.use(express.json())
// a public mappa fájljait (index.html, front.js) a szerver szolgálja ki: http://localhost:3000/index.html
app.use(express.static(path.join(__dirname, "public"), { index: false }))

app.get("/", (_req:Request, res:Response) => {
    res.json({ message: "hello world"})
})

// _req a paraméter, ami nem lesz használva, ezért _-al kezdődik a neve
app.post("/", (_req:Request, res:Response) => 
    {
        res.json({ message : "ez egy post kérés"}) // json formátum szóval .json-el tudom feloldani
    })

// _req a paraméter, ami nem lesz használva, ezért _-al kezdődik a neve
app.post("/a", (_req:Request, res:Response) => 
    {
        res.send({message: "szoveg"}) // text formátum szóval .text-el tudom feloldani
    })

app.get("/products", (_req:Request, res:Response) => {
    res.json(
        data
    )
})

// egy termék adatainak módosítása (a módosítás csak memóriában él, újraindításkor elveszik)
const editableFields = ["name", "category", "brand", "price", "currency", "stock", "rating", "active", "description", "image"]

app.put("/products/:id", (req:Request, res:Response) => {
    const id = Number(req.params.id)
    const product = data.find(p => p.id === id)
    if (!product) {
        res.status(404).json({ message: "Nincs ilyen termék" })
        return
    }
    // csak az engedélyezett mezőket írom át, az id-t nem lehet módosítani
    for (const field of editableFields) {
        if (req.body[field] !== undefined) {
            (product as any)[field] = req.body[field]
        }
    }
    res.json(product)
})

app.listen(3000, () => {
    console.log("Fut a szerver")
})

