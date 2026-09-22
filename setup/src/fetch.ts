interface IUser {
    id: number,
    name: string,
    email: string
}

async function getUsers(): Promise<IUser[]> {

    const response =  await fetch("https://jsonplaceholder.typicode.com/users", {method: "POST", headers:{'Content-Type': "application/json"}, body: JSON.stringify({name:"pisti",email:"pisti@example.com"})})

    if(!response.ok){
        throw new Error("HTTP error")
    }

    const users: IUser[] = await response.json()
    return users
}


try{
    console.log(await getUsers())
}
catch{
    console.log("hiba")
}

// JSON.stringify  a javascript objektumot JSON stringgé alakítja