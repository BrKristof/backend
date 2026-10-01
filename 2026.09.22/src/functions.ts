// Külső API (jsonplaceholder) hívása fetch-el
import { IUser } from "./interface.js"; //mivel minden ts az js-re fordul, ezért a js kiterjesztést kell használni

// elküld egy új felhasználót (pisti) a jsonplaceholder /users végpontjára, és visszaadja a választ
export async function getUsers(): Promise<IUser[]> {

    const response =  await fetch("https://jsonplaceholder.typicode.com/users", {method: "POST", headers:{'Content-Type': "application/json"}, body: JSON.stringify({name:"pisti",email:"pisti@example.com"})})

    // ha a státuszkód nem 2xx, hibát dob
    if(!response.ok){
        throw new Error("HTTP error")
    }

    const users: IUser[] = await response.json() // a JSON választ objektummá alakítja
    return users
}
