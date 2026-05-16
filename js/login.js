let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  // Ngặn chặn hành động load mặc định của trang web
  event.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if(!email || !password){
    alert("Please enter email and password");
  }else{
    let users = JSON.parse(localStorage.getItem("users"));
    // Find trong javascript sẽ trả về giá trị đúng với điều kiện
    let user = users.find((account) => {
      return account.email === email && account.password === password;
    });

    if(user){
        localStorage.setItem("userSession", JSON.stringify(user));
        alert("Login successfully");
        location.href = "./index.html";
    }else{
        alert("Email or password is incorrect");
    }
  }
});