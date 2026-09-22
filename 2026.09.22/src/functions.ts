import { IUser } from "./interface.js"; //mivel minden ts az js-re fordul, ezért a js kiterjesztést kell használni

export async function getUsers(): Promise<IUser[]> {

    const response =  await fetch("https://jsonplaceholder.typicode.com/users", {method: "POST", headers:{'Content-Type': "application/json"}, body: JSON.stringify({name:"pisti",email:"pisti@example.com"})})

    if(!response.ok){
        throw new Error("HTTP error")
    }

    const users: IUser[] = await response.json()
    return users
}