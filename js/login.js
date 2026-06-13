let form = document.querySelector("form");

const URL = "https://6a1160413e35d0f37ee33624.mockapi.io/users"

users = []

fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        users = data
    });

form.addEventListener("submit", (event) => {
    // Ngặn chặn hành động load mặc định của trang web
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    //   for(let i = 0; i <users.length; i++){
    //     if(username == users[i].username && password == users[i].password){

    //         localStorage.setItem("recentUser", username)

    //         alert("Login successfully");


    //         location.href = "./index.html";
    //         return
    //     }else if(i === users.length - 1){
    //         alert("Username or password is incorrect");
    //     }
    //   }  

    info = users.find(user => user.username == username);

    if (username == info.username && password == info.password) {
        localStorage.setItem("recentUser", username)
        alert("Login successfully");

        location.href = "./index.html";
    } else {
        alert("Username or password is incorrect");
        location.reload();
    }
});