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

function osszead(a: number, b:number):number{
  return a + b
}

function kiir(uzenet :string):void{
  console.log(uzenet)
}

function ujFelhasznalo(neve:string,eletkor:number): void{
  console.log({neve,eletkor})
}

function udvozol(neve:string,megszolitas?:string):void{
  if(megszolitas){
    console.log(`Szia ${megszolitas} ${neve}`)
  }
  else{
    console.log(`Szia ${neve}`)
  }
  
}

function udvozol2(neve:string = "vendeg",megszolitas?:string):string{
  if(megszolitas){
    return console.log(`Szia ${megszolitas} ${neve}`)
  }
  return console.log(`Szia ${neve}`)

  
}

const osszeg = (a:number, b:number):number => {return a+b}
const osszeg2 = (a:number, b:number):number =>  a+b

//////////////////////////////////

type Fh = {name:string,age:number,active:boolean}
interface IFh {
  name: "john",
  age:34,
  active:true
}


const fh: IFh = {
  name: "john",
  age:34,
  active:true
}

const value: unknown = 30

const strValue:string  =value as string //átkonvertálja stringgé
const strValue2:string  = <string>value //elvileg ugyanaz mint az elozo


console.log(strValue*30)
console.log(strValue.toUpperCase())

interface IDolgozo extends IFh{
  munkakor: string
}

const dolgozo: IDolgozo = {
  name: "John",
  age: 19,
  active:true,
  munkakor:"fejleszto"
}

/////////////////////////////////////////////////////////////////////
class D {
  public name:string;
  public readonly age:number;
  private password:string
  protected role: string // az osztályban és annak leszármazottaiban használhatjuk

  constructor(name:string, age:number,password:string,role:string){
    this.name = name
    this.age = age
    this.password = password
    this.role = role
  }

  greet(){
    return `hello my name is ${this.name} and im ${age} years old`
  }
  introduce(){
    return `hello my name is ${this.name}. yoroshiku`
  }
}

class AdminUser extends D{
  constructor(name:string, age:number,password:string){
    super(name,age,password,"admin")
  }

  getPassword(){
    return this.password //hibat dob mivel ez a D osztály privát mezeje és nem érhető el meg a gyerek osztályban sem, ha megis elakarjuk érni akkor protected-e kell tenni
  }

  getRole(){
    return this.role
  }
}

const us = new D('chi',21,"chichi","admin")
const aus = new AdminUser('chi',21,"chichi")

//abstract class
//speciális osztály aminek célja hogy belőluk származtassunk osztályokat
//nem lehet példányosítani őket
//előregyártott sablonoknak is lehet őket tekinteni

function identitas<T>(arg: T):T{
  return arg
}

const result1 = identitas<string>("hello ts")
const result2 = identitas<number>(43)

function getFirtItem<T>(arr: T[]):T | undefined{
  return arr[0]
}

const n = [1,2,5]
const ns = ['yes']
const firstNumber = getFirtItem<number>(n)
const firstName = getFirtItem<string>(ns)

//////////////

interface IApiResponse<T> {
  status: number,
  message?: string,
  data: T
}

interface IUser {
  id:string;
  name:string;
  email:string;
  avatarUrl?: string;
  createAt:Date;
  updateAt:Date
}

const apiResponse: IApiResponse<IUser> = {
  status: 200,
  message: 'user fetched succesfully',
  data: {
    id:'12345',
    name:'fsdfsd',
    email: "sahksd@gmail.com",
    createAt: new Date(),
    updateAt: new Date()
  }
}

//ezzel tudom egy osztaly részét tudod használni
/*const updateUser: Partial<IUser> = {
  name:"john doe"
}*/

//minden értéket meg kell adni 
/*const updateUser: Required<IUser> = {
  id:"1245",
  name:'jh',
  email:"fds",
  createAt: new Date(),
  updateAt: new Date()
}*/

/*const updateUser: Pick<IUser, 'id'|'name'> = {
  id: "642324",
  name: "done"
}*/

//itt azt választjuk ki mit kell kihagyni
/*const updateUser: Omit<IUser, 'id' | 'name'> = {
  email:"fds",
  createAt: new Date(),
  updateAt: new Date()
}*/ 

const updateUser: IUser = {
  id:"1245",
  name:'jh',
  email:"fds",
  createAt: new Date(),
  updateAt: new Date()
}
console.log(updateUser)

type UserKey = keyof IUser
const field = 'name'
const key  = field as UserKey

console.log(updateUser[key])

///////////////////////////////////

const kocka = {a:20, b:10}
type Kocka = typeof kocka

const kocka2: Kocka = {a:30, b:40}
console.log(kocka2)

if(updateUser.name !== null) {
  console.log(updateUser.name.toUpperCase())
}

const name__ = updateUser?.avatarUrl ?? "ismeretlen"

///////////////////////////////////


