// A termék modell: az IProduct interface (milyen mezői vannak egy terméknek),
// a Product osztály (egy termék, ellenőrzött setterekkel és üzleti metódusokkal),
// és a Products osztály (több termék kezelése, még félkész)
// a datat erdemes betolteni egy valtozoba 
import data from "../../app/data/data";

// egy termék felépítése (típusa), ugyanazok a mezők, mint a data.ts-ben
export interface IProduct {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  currency: string;
  stock: number;
  rating: number;
  active: boolean;
  description: string;
  image: string;
}

// egy terméket reprezentáló osztály, az adatokat privát mezőkben tárolja, kívülről getter/setter-en át érhetők el
export class Product implements IProduct {
  // Privát belső állapotok
  private _id: number;
  private _name: string;
  private _category: string;
  private _brand: string;
  private _price: number;
  private _currency: string;
  private _stock: number;
  private _rating: number;
  private _active: boolean;
  private _description: string;
  private _image: string;

  // A konstruktor egy IProduct-ot (vagy annak egy részét) vár paraméterül
  // ha egy mező hiányzik, a ?? operátor után megadott alapértéket kapja
  constructor(data: Partial<IProduct> = {}) {
    this._id = data.id ?? 0;
    this._name = data.name ?? '';
    this._category = data.category ?? '';
    this._brand = data.brand ?? '';
    this._currency = data.currency ?? 'HUF';
    this._active = data.active ?? true;
    this._description = data.description ?? '';
    this._image = data.image ?? '';

    // Validált számértékek inicializálása
    this._price = Math.max(0, data.price ?? 0); // negatív ár helyett 0
    this._stock = Math.max(0, data.stock ?? 0); // negatív készlet helyett 0
    this._rating = Math.min(5, Math.max(0, data.rating ?? 0.0)); // 0 és 5 közé szorítja
  }

  // --- IProduct interface-ből adódó Getterek és Setterek ---

  get id(): number { return this._id; } // az id-nek nincs settere, így létrehozás után nem módosítható

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get category(): string { return this._category; }
  set category(value: string) { this._category = value; }

  get brand(): string { return this._brand; }
  set brand(value: string) { this._brand = value; }

  get price(): number { return this._price; }
  set price(value: number) {
    if (value < 0) throw new Error("Az ár nem lehet negatív!");
    this._price = value;
  }

  get currency(): string { return this._currency; }
  set currency(value: string) { this._currency = value; }

  get stock(): number { return this._stock; }
  set stock(value: number) {
    if (value < 0) throw new Error("A készlet nem lehet negatív!");
    this._stock = value;
  }

  get rating(): number { return this._rating; }
  set rating(value: number) {
    if (value < 0 || value > 5) throw new Error("Az értékelésnek 0 és 5 között kell lennie!");
    this._rating = value;
  }

  get active(): boolean { return this._active; }
  set active(value: boolean) { this._active = value; }

  get description(): string { return this._description; }
  set description(value: string) { this._description = value; }

  get image(): string { return this._image; }
  set image(value: string) { this._image = value; }

  // --- Extra számított tulajdonságok (Computed Properties) ---

  // az árat magyar formátumban, pénznemmel adja vissza (pl. "349 990 Ft")
  get formattedPrice(): string {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: this._currency,
      maximumFractionDigits: 0
    }).format(this._price);
  }

  // --- Üzleti logikai metódusok ---

  // csökkenti a készletet; false-t ad vissza, ha a mennyiség hibás vagy nincs elég készlet
  public reduceStock(amount: number): boolean {
    if (amount <= 0 || this._stock < amount) return false;
    this._stock -= amount;
    return true;
  }

  // növeli a készletet (csak pozitív mennyiséggel)
  public increaseStock(amount: number): void {
    if (amount > 0) this._stock += amount;
  }

  // százalékos kedvezményt alkalmaz az árra, az eredményt egészre kerekíti
  public applyDiscount(percentage: number): void {
    if (percentage < 0 || percentage > 100) {
      throw new Error("A kedvezménynek 0 és 100% között kell lennie!");
    }
    const discountAmount = (this._price * percentage) / 100;
    this._price = Math.round(this._price - discountAmount);
  }

  // Segédfunkció az adatok tiszta JSON-ná alakításához (pl. API-nak való visszaküldéshez)
  // (a JSON.stringify / res.json automatikusan meghívja, ezért nem a privát _ mezők kerülnek ki)
  public toJSON(): IProduct {
    return {
      id: this._id,
      name: this._name,
      category: this._category,
      brand: this._brand,
      price: this._price,
      currency: this._currency,
      stock: this._stock,
      rating: this._rating,
      active: this._active,
      description: this._description,
      image: this._image,
    };
  }
}

// product tomb osztaly letrehozasa ami olyan elemekbol epul fel mint a product interface, kiegeszitve fugvenyekkel amik pl kitorolnek hozzaadnak
class Products{

  // a tárolt termékek listája
  private _products: Product[] = []

  // a kapott termékeket egyenként beteszi a listába
  constructor(dataArr: Product[]){
    for(let e of dataArr){
      this._products.push(e)
    }
  }

  // termékek hozzáadása (nyers adatokból Product objektumokat készít)
  public addProduct(initialProduct: Partial<Product>[] = []): void {
    this._products = initialProduct.map(p => new Product(p))
  }

  // termék törlése id alapján (még nincs megírva, a kód ki van kommentelve)
  public removeProduct(productId: number): void {
    /*const index = this._products.findIndex(p => p.id === productId);
    if (index === -1) return false;
    this._products.splice(index, 1);
    return true;*/
  }

  // az összes terméket sima objektumként (IProduct[]) adja vissza
  get allProductsData(): IProduct[]{
    return this._products.map(p => p.toJSON())
  }

  // több termék hozzáadása egyszerre (még üres)
  public addMoreThanOneProduct(arr: Product[]){

  }




  // i need to check if when i add an item, one  value of the item is not null undefined or "" and if it is then i return a boolean value of false and if all values are valid then i return true
  public validateProductData(productData: Partial<IProduct>): boolean {
    for (const key in productData) {
      const value = productData[key as keyof IProduct];
      if (value === null || value === undefined || value === "") {
        return false;
      }
    }
    return true;
  }
}



/*
==================== TALÁLT HIBÁK ====================
(a `npx tsc --noEmit` típusellenőrzés és a kód átnézése alapján)

--- src/controllers/product/product.ts (ez a fájl) ---
1. 1. sor: `import data from "../../app/data/data"` -> nincs használva, ráadásul a konstruktor
   `data` paramétere eltakarja (shadowing). Hiányzik a `.ts` kiterjesztés is, amit a többi import használ.
   Javítás: törölni kell ezt a sort.
2. Products.addProduct: `this._products = ...` FELÜLÍRJA az egész listát, nem hozzáad.
   Javítás: `this._products.push(...initialProduct.map(p => new Product(p)))`
3. Products.addProduct paramétere `Partial<Product>[]`, de inkább `Partial<IProduct>[]` kellene
   (a Product típus a metódusokat is tartalmazza, nyers adatból nem az jön).
4. Products konstruktora `Product[]`-ot vár, de a data.ts-ben sima objektumok vannak (IProduct[]),
   így `new Products(data)` nem működne. Javítás: `IProduct[]`-ot várni és `new Product(e)`-t pusholni.
5. Products.removeProduct üres (ki van kommentelve), és a visszatérési típusa `void`,
   miközben a kikommentelt kód `boolean`-t adna vissza -> a típust `boolean`-ra kell állítani.
6. Products.addMoreThanOneProduct üres; az addProduct már tömböt vár, így ez felesleges duplikáció.
7. A Products osztály nincs exportálva és sehol nincs használva.
8. A konstruktor csendben 0-ra/5-re javítja a hibás számokat, a setterek viszont hibát dobnak ->
   következetlen viselkedés. Ráadásul egyik sem szűri ki a NaN-t vagy a szöveget
   (pl. price: "abc" -> NaN ár), a formattedPrice pedig hibát dob érvénytelen pénznemnél (pl. "XYZ").

--- src/controllers/product/controller.ts ---
9. Az `IProduct` import nincs használva.
10. setProduct semmit nem ment el (nem kerül bele a data tömbbe), csak visszaküldi a kapott adatot;
    az id-t is a klienstől fogadja el, így ütköző id-k jöhetnek létre.

--- src/controllers/product/routes.ts + src/app/app.ts ---
11. Az app.ts "/product" elé csatolja a routert, ezért a címek: /product/products és /product/product
    (furcsa, duplázott elnevezés). A front.js viszont a /products és PUT /products/:id címeket hívja,
    ami csak a server.ts-ben van -> a termék végpontok két helyen, kétféleképpen vannak megírva.

--- src/app/server.ts (EZ MIATT NEM INDUL EL A SZERVER) ---
12. Nincs importálva az `express`, a `path` és a `data` -> futáskor ReferenceError, a szerver összeomlik.
    Javítás: `import express from "express"`, `import path from "path"`, `import data from "./data/data.ts"`
13. Nincs importálva a `Request` és `Response` típus az express-ből, ezért a TS a böngészős (fetch)
    Request/Response típusokat használja -> rengeteg típushiba (res.json, req.params, req.body...).
    Javítás: `import type { Request, Response } from "express"`
14. A GET "/" kétszer van definiálva: a routes.ts-ben (app.ts) és itt is. Az app.ts-beli fut le előbb,
    így az itteni GET "/" soha nem fut le.
15. POST /products csak visszaküldi az adatot, nem menti el.
16. PUT /products/:id nem ellenőrzi a kapott értékek típusát (pl. price lehet szöveg),
    a `(product as any)` pedig kikapcsolja a típusellenőrzést. Itt lehetne a Product osztály settereit használni.

--- src/functions.ts + src/index.ts ---
17. functions.ts: `import { IUser }` -> a `verbatimModuleSyntax` miatt `import type { IUser }` kell.
18. getUsers a neve ellenére POST kérést küld (új felhasználót hoz létre), és a válasz EGY objektum,
    nem tömb, tehát a `Promise<IUser[]>` típus hazudik. Javítás: GET kérés, body nélkül.
19. index.ts / functions.ts a `.js` kiterjesztéssel importál, de csak `.ts` fájl létezik; az
    `npm run dev` (`node ./src/index.ts`) ezt nem írja át, így "Cannot find module" hibát kap.
    A többi fájl `.ts`-t használ -> egységesen `.ts` legyen.
20. index.ts top-level await-et használ, ami CommonJS módban ("type": "commonjs") nem működik.

--- src/controllers/run.ts ---
21. `_reg` paraméternév elírás (`_req` akart lenni) – működni működik, csak félrevezető.

--- package.json / tsconfig.json ---
22. package.json "type": "commonjs", de minden fájl ESM `import/export` szintaxist használ ->
    a tsc minden fájlra TS1295 hibát ad. Javítás: "type": "module" (ekkor viszont a server.ts-ben
    a `__dirname` nem létezik, helyette `import.meta.dirname` kell).
23. tsconfig "types": [] és nincs @types/node -> a `process`, `__dirname`, `path` típusai nem ismertek.
    Javítás: `npm i -D @types/node` és "types": ["node"].
24. A dependencies-ben rengeteg felesleges csomag van (anymatch, braces, chokidar... ezek a nodemon
    saját függőségei), a "tsc" devDependency egy rossz csomag (nem a TypeScript fordító),
    a dotenv pedig devDependency, pedig futásidőben kell -> dependencies-be való.
25. express.urlencoded() opció nélkül: érdemes `{ extended: true }`-t megadni, hogy egyértelmű legyen.
======================================================
*/
