import {getUsers} from "./functions.js";

try{
    console.log(await getUsers())
}
catch{
    console.log("hiba")
}