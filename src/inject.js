// const data_path = "../data.json";


const url = chrome.runtime.getURL('data/accounts.json');

fetch(url)
    .then((response) => response.json())
    .then((arr) => (arr[Math.floor(Math.random()*arr.length)]))
    .then((account) => {
        const name = document.getElementById("loginname");
        const password = document.getElementById("password");
        if (!!name) name.value = account.username ;
        if (!!password) password.value = account.password ;
    });