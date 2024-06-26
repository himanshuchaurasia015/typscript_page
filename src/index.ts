const Username =document.querySelector("#user") as HTMLInputElement;
const formSubmit =document.querySelector("#form") as HTMLFormElement;
const main_container =document.querySelector(".main_container") as HTMLElement;

//define contract of an object
interface UserData{
    id:number;
    login:string;
    avatar_url:string;
    location:string;
    url:string;
}

async function myCustomFetcher<T>(
    url:string, 
    options?:RequestInit
    ):Promise<T>{
     const response = await fetch(url,options);
     if (!response.ok){
        throw new Error(
            `Network response not ok- status:${response.status}`
        );
     }
     const data= await response.json();
    //  console.log(data)
     return data;
}


const showResult=(user:UserData)=>{
    const {avatar_url,login,url}=user;
    const element=`<div class='card'>
        <hr/>
        <div class='card'>
        <img src=${avatar_url} alt=${login}/>
        <p style="color:white"><u>${login}</u></p>
        <a href="${url}"> Github</a>
        </div>
        </div>`
    main_container.insertAdjacentHTML("beforeend", element);

};

function fetchUserData(url:string){
    myCustomFetcher<UserData[]>(url,{}).then((userInfo:UserData[])=>{
        for (const user of userInfo) {
            showResult(user);  
        }
    });
}

//default funtion call
fetchUserData("https://api.github.com/users")

formSubmit.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const searchTerm= Username.value.toLowerCase();
    try {
        const url  =`https://api.github.com/users`;
        const allUserData:UserData[]=await myCustomFetcher(url,{});
        const matchingUsers:UserData[]=allUserData.filter((user:UserData):boolean=>{
            return user.login.toLowerCase().includes(searchTerm)

        });
        main_container.innerHTML="";
        

        if (matchingUsers.length===0) {

            main_container.insertAdjacentHTML(
                "beforeend",
                `<p class="empty-msg"> No matching users found.</p>`
            )
            
        }else{
            for(const single of matchingUsers){

                showResult(single);

            }
        }
        
    } catch (error) {
    console.log(error);

        
    }
})

