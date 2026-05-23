let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    // Ngặn chặn hành động load mặc định của sever
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Regex kiểm tra kí tự 
    let lowerCaseLetter = /[a-z]/g;
    let upperCaseLetter = /[A-Z]/g;
    let numbers = /[0-9]/g;

    if (password.length < 8) {
        alert("Password must be at least 8 characters");
        // Kiểm tra password có kí tự viết thường không
    } else if (!password.match(lowerCaseLetter)) {
        alert("Password must contain a lowercase letter");
        // Kiểm tra password có kí tự viết hoa không
    } else if (!password.match(upperCaseLetter)) {
        alert("Password must contain an uppercase letter");
    } else if (!password.match(numbers)) {
        alert("Password must contain a number or special character");
    } else if (password !== confirmPassword) {
        alert("Password and confirm password do not match");
    } else {
        let users = JSON.parse(localStorage.getItem("users"));
        // Find trong javascript sẽ trả về giá trị đúng với điều kiện
        let user = users.find((account) => {
            return account.email === email;
        });

        if (user) {
            user.password = password;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Reset password successfully");
            location.href = "./login.html";
        } else {
            alert("Email email is incorrect");
        }
    }
});