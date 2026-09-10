import console from "node:console"


let name : string = "Pepe"

let age : number = 45
let price : number = 1.56

let isActive : boolean = true

//let bigNum : bigint = 9007188254740991

let id : symbol = Symbol("id")

let obj = {
  [id] : "value"
}

let obj2 = {
  id : "other value"
}

console.log(obj[id])
console.log(obj2["id"])

////////////////////////////////////////

class C {
  [id](){
    return "osztaly fuggveny"
  }
}

let c : any = new C()
let osztalynev = c[id]()
console.log(osztalynev)

//////////////////////////////////////////

let valami : any = "hello"
console.log(valami)
valami = 10
console.log(valami)
valami = true
console.log(valami)

//////////////////////////////////////////

let valami2 : unknown = "hello"
console.log(valami2)

if(typeof valami === "string"){
  console.log(valami2.toUpperCase())
}

valami2 = 10
console.log(valami2)
valami2 = true
console.log(valami2)

//////////////////////////////////////////

let valami3 : null = null
let valami4: undefined
console.log(valami3)
console.log(valami4)

//////////////////////////////////////////

const numbers : number[] =  [ ]
const names : string[] = []

const nums : Array<number> = []

numbers.forEach((num:number) => console.log(num))

names.forEach((name:string) => console.log(name))


//////////////////////////////////////////
const user : {name:string; age:number}  ={
  name: "alice",
  age: 18
}

const user2: [string,number] = ["bob",34]
console.log(user2)

///////////////////////////////////
//No clue
enum Role{
  Admin = "admin",
  User = "user",
  Quest = "quest"
}

const userRole: Role = Role.Admin

console.log(`User role is ${userRole}`)

//////////////////////////////////

type User = {
  id: number,
  name:string,
  email:string,
  isActive:boolean
}

const users: User[] = [
  {
    id: 1,
    name: "jane",
    email: "idk@gmail.com",
    isActive: true
  }
]


//////////////////////////
//No clue about interface 
interface Felhasznalo {
   readonly id: number,
  name:string,
  email?:string,
  isActive:boolean
}

const felhasznalok: Felhasznalo[] = [
  { id: 1, name: "jane", email: "idk@gmail.com", isActive: true},
  { id: 2, name: "jone", email: "idk@gmail.com", isActive: false}
]

class userService implements Felhasznalo{
  readonly id:number;
  name:string;
  email?: string;
  isActive: boolean

  constructor(id:number,name:string,email: string, isActive:boolean){
    this.id = id
    this.name = name
    this.email = email
    this.isActive = isActive
  }
}

const felhasznalo : Felhasznalo = new userService(2,"jone","idk@gmail.com",false)
// felhasznalo.id = 2 nem fog mukodni a readonly attribute miatt

////////////////////////////////////////////////////


let Id : number | string;

Id = 10
Id = "cba"

let literal : "bal" | "jobb"
literal = "bal"
literal = "jobb"
//literal = "other"  csak a felsorolt ertekeket veheti fel

//////////////////////////////////////////

type szemely = {name :string}

type dolgozo = {dolgozoId: number}

type dolgozoSzemely = szemely& dolgozo

const dolgozo1: dolgozoSzemely = {
  name: "jone",
  dolgozoId: 2345
}

console.log(dolgozo1)

//////////////////////////////////////////////

