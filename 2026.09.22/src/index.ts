// Belépési pont (npm run dev): meghívja a getUsers-t és kiírja az eredményt a konzolra
import {getUsers} from "./functions.js";

try{
    console.log(await getUsers()) // top-level await: modul szinten várja meg a választ
}
catch{
    console.log("hiba") // ha a kérés nem sikerült
}
