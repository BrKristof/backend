// A szerver belépési pontja (npm run dev-ts): betölti a .env-et, további útvonalakat ad az app-hoz és elindítja a szervert
import app from "./app.ts"
import dotenv from "dotenv"

dotenv.config() // a .env fájlban lévő változókat betölti a process.env-be

const PORT = process.env.PORT  || 3001 // ha nincs PORT a .env-ben, akkor a 3001-es porton fut



// a public mappában lévő statikus fájlokat (index.html, front.js) szolgálja ki
// index: false -> a "/" címen nem az index.html jön, hanem a lenti route; az oldal a /index.html címen érhető el
app.use(express.static(path.join(__dirname, "public"), { index: false }))

// GET / -> egy egyszerű "hello world" JSON üzenetet ad vissza
app.get("/", (_req:Request, res:Response) => {
    res.json({ message: "hello world"})
})

// POST / -> egy JSON üzenetet ad vissza
// _req a paraméter, ami nem lesz használva, ezért _-al kezdődik a neve
app.post("/", (_req:Request, res:Response) =>
    {
        res.json({ message : "ez egy post kérés"}) // json formátum szóval .json-el tudom feloldani
    })

// POST /a -> res.send-del küld választ
// _req a paraméter, ami nem lesz használva, ezért _-al kezdődik a neve
app.post("/a", (_req:Request, res:Response) =>
    {
        res.send({message: "szoveg"}) // text formátum szóval .text-el tudom feloldani
    })

// GET /products -> visszaadja az összes terméket (ezt használja a front.js)
app.get("/products", (_req:Request, res:Response) => {
    res.json(
        data
    )
})

// egy termék adatainak módosítása (a módosítás csak memóriában él, újraindításkor elveszik)
// azok a mezők, amiket a kliens módosíthat
const editableFields = ["name", "category", "brand", "price", "currency", "stock", "rating", "active", "description", "image"]

// PUT /products/:id -> az adott id-jű termék módosítása (a front.js szerkesztő űrlapja hívja)
app.put("/products/:id", (req:Request, res:Response) => {
    const id = Number(req.params.id) // az URL-ből jövő id szöveg, ezért számmá alakítom
    const product = data.find(p => p.id === id)
    if (!product) {
        res.status(404).json({ message: "Nincs ilyen termék" }) // 404 = nem található
        return
    }
    // csak az engedélyezett mezőket írom át, az id-t nem lehet módosítani
    for (const field of editableFields) {
        if (req.body[field] !== undefined) {
            (product as any)[field] = req.body[field]
        }
    }
    res.json(product) // visszaküldi a módosított terméket
})



// POST /products -> kiírja a konzolra és visszaküldi a kapott adatot (nem menti el)
app.post("/products", (req:Request, res:Response) => {
    console.log(req.body)
    res.send(req.body)
})


// elindítja a szervert a megadott porton
app.listen(PORT, () => {
    console.log( `Fut a szerver a ${PORT} porton`)
})
