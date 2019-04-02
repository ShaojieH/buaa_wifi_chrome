const url = chrome.runtime.getURL('data/accounts.json');

var account = {username: "username", password:"password"};



saveUserInfoToStorage = () => {
    console.log("Saving: ", account);
    chrome.storage.local.set({"username" : account.username});
    chrome.storage.local.set({"password" : account.password});
}
 
inject = () => {
    chrome.tabs.executeScript(null,
        {code: 'account = ' + JSON.stringify(account)}
        , ()=>{chrome.tabs.executeScript(null, {file:"src/inject.js"})});
}



getAccount = () =>{
    console.log('getting account');
    fetch(url)
    .then((response) => response.json())
    .then((arr) => (arr[Math.floor(Math.random()*arr.length)]))
    .then((result) => {
        account = result;
        inject();
    });
}

login = () => {
    console.log('logging in');
    saveUserInfoToStorage();
    chrome.tabs.executeScript(null, {file: "src/login.js"});
}

logout = () => {    
    console.log('logging out');

    chrome.storage.local.get("username", (result)=>{    // TODO: fix
        account.username = result.username;
        chrome.storage.local.get("password", (result)=>{
            account.password = result.password;
            console.log("Loggin out of", account);
            inject();
            chrome.tabs.executeScript(null, {file: "src/logout.js"});
        });
    });

}

document.getElementById('getAccount').addEventListener('click', getAccount);
document.getElementById('login').addEventListener('click', login);
document.getElementById('logout').addEventListener('click', logout);