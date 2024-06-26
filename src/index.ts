const Username =document.querySelector("#user") as HTMLInputElement;
const formSubmit =document.querySelector(".form") as HTMLFormElement;
const main_container =document.querySelector(".main-container") as HTMLElement;

//define contract of an object
interface UserData{
    id:number;
    login:string;
    avatar_url:string;
    location:string;
    url:string;
}

async function myCustomFetcher<T>(url:string, options?:RequestInit):Promise<T>{
     const response = await fetch(url);
     if (!response.ok){
        throw new Error(`Network response not ok- status:${response.status}`);
     }
     const data= await response.json();
     console.log(data)
     return data;
}


const showResult=(user:UserData)=>{

}

const fetchUserData=(url:string)=>{
    myCustomFetcher<UserData[]>(url,{}).then((userInfo)=>{
        for (const user of userInfo) {
            showResult(user);
            
        }
    })

}

//default funtion call
fetchUserData("https://api.github.com/users")

