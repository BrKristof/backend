interface IUser {
  id:string;
  name:string;
  email:string;
  avatarUrl?: string;
  createAt:Date;
  updateAt:Date
}

const getUser = () : Promise<string> => {
    return new Promise((resolve, reject) => {
        const succes = true
        if(succes){
            setTimeout(() => {
                resolve("pisti")
            }, 5000);  
        }
        else{
            reject("error")
        }  
    })
}

const getAdmin = (): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const success = true;
    if (success) {
      setTimeout(() => {
        resolve({id:"10",name:"admin",email:"a@mai.com"});
      }, 5000);
    } else {
        reject("Az admin adatok nem kerheto le")
    }
  });
};

getUser().then((name) => {
    console.log("name", name)
}).catch((error) => {
    console.log("error", error)
})

Promise.all([getUser,getAdmin]).then(([user,admin]) => {
    console.log("user", user)
    console.log("admin", admin)
})

const user = Promise.resolve({id:10,name:"pisti",email:"vnd@gmail.com",createAt:new Date(),updateAt:new Date()})

Promise.race([user,getAdmin()]).then((leggyorsabb) => {
    console.log("leggyorsabb", leggyorsabb)
})

async function main(): Promise<void> {
    try{
        const name = await getUser()
    } catch(error){
        console.error("error", error)
    } 
}

main()

