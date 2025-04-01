function Login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    console.log(user, pass); // Kiểm tra giá trị nhập vào

    if (user === "admin" && pass === "123") {
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "../index.html"; // Kiểm tra lại đường dẫn
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
}

function logout() {
    sessionStorage.removeItem("loggedIn");
    alert("Đăng xuất thành công!");
    window.location.href = "../login/login.html?_ijt=4a1bnsk23n76sb35cn500sh8e8&_ij_reload=RELOAD_ON_SAVE"; // Chuyển về trang đăng nhập
}
////////////////
