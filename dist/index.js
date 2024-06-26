"use strict";
const Username = document.querySelector("#user");
const formSubmit = document.querySelector(".form");
const main_container = document.querySelector(".main-container");
async function myCustomFetcher(url, options) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response not ok- status:${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}
const showResult = (user) => {
};
const fetchUserData = (url) => {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const user of userInfo) {
            showResult(user);
        }
    });
};
//default funtion call
fetchUserData("https://api.github.com/users");
