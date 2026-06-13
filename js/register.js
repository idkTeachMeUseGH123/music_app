let form = document.querySelector("form");

const URL = "https://6a1160413e35d0f37ee33624.mockapi.io/users"

users = []

fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        users = data
    });

window.checkExistUser = function (email) {
    return users.some(user => user.email === email);
}

window.checkExistUsername = function (username) {
    return users.some(user => user.username === username);
}

form.addEventListener("submit", (event) => {
    // Ngặn chặn hành động load mặc định của sever
    event.preventDefault();
    const role = "user";
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    // Regex kiểm tra kí tự 
    let lowerCaseLetter = /[a-z]/g;
    let upperCaseLetter = /[A-Z]/g;
    let numbers = /[0-9]/g;
    const phonePattern = /^[0-9]{10,}$/;

    if (username.length < 3) {
        alert("Username must be at least 3 characters");
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters");
        // Kiểm tra password có kí tự viết thường không
    } else if (!password.match(lowerCaseLetter)) {
        alert("Password must contain a lowercase letter");
        // Kiểm tra password có kí tự viết hoa không
    } else if (!password.match(upperCaseLetter)) {
        alert("Password must contain an uppercase letter");
    } else if (!password.match(numbers)) {
        alert("Password must contain a number or special character");
    } else if (checkExistUser(email)) {
        alert("This email has existed, please try another")
    } else if (checkExistUsername(username)) {
        alert("This username has existed, please try another")
    } else {
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                username,
                role: "user",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("users", JSON.stringify(data));
                alert("User created successfully, please login");
                location.href = "./login.html";
            });

    }
});