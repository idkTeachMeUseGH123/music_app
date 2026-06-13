const URL = "https://6a1160413e35d0f37ee33624.mockapi.io/users"

users = []

fetch(URL)
    .then(response => response.json())
    .then(data => {
        users = data
        renderAccount(data)
    })
    .then(error => console.log(error))

// window.checkExistUsername = function(username){
//     return users.some(user => user.username === username);
// }

window.renderAccount = (data) => {

    const userRecently = document.getElementById("userRecently")
    const emailRecently = document.getElementById("emailRecently")
    const passwordRecently = document.getElementById("passwordRecently")

    let takeUser = localStorage.getItem("recentUser")

    document.getElementById("userRecentlyH1").textContent = takeUser
    userRecently.value = takeUser

    // for(let i = 0; i < users.length; i++){

    //     if (users[i].username == takeUser){

    //         console.log(users[i].email)

    //         emailRecently.value = users[i].email
    //         passwordRecently.value = users[i].password

    //     }

    // }

    info = users.find(user => user.username == takeUser)

    emailRecently.value = info.email
    passwordRecently.value = info.password

}