const URL = "https://6a1160413e35d0f37ee33624.mockapi.io/users"

users = []

fetch(URL)
    .then(response => response.json())
    .then(data => {
        users = data
        renderAccount(data)
    })
    .then(error => console.log(error))

window.renderAccount = (data) => {

    const userRecently = document.getElementById("userRecently")
    const emailRecently = document.getElementById("emailRecently")
    const passwordRecently = document.getElementById("passwordRecently")

    let takeUser = localStorage.getItem("recentUser")

    document.getElementById("userRecentlyH1").textContent = takeUser
    userRecently.value = takeUser

    info = users.find(user => user.username == takeUser)

    emailRecently.value = info.email
    passwordRecently.value = info.password

}

function logout() {
    localStorage.removeItem("recentUser");
    location.href = "./login.html";
}

function admin() {
    const info = users.find(
        user => user.username === localStorage.getItem("recentUser")
    );

    if (info?.role === "admin") {
        location.href = "./admin.html";
    } else {
        alert("You are not admin");
    }
}