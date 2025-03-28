document.addEventListener("DOMContentLoaded", function () {
    if (!sessionStorage.getItem("loggedIn")) {
        window.location.href = "../login/login.html";
        return;
    }

    home();
});

function home() {
    const content = `
        <div class="welcome-container">
            <h1 class="welcome-title">🎉 Xin chào! Chào mừng bạn đến với Admin 🎉</h1>
            <p class="welcome-text">Chúc bạn có một ngày làm việc hiệu quả!</p>
            <img src="https://img.freepik.com/free-vector/welcome-concept-illustration_114360-7866.jpg" alt="Welcome Image" class="welcome-image">
        </div>
    `;
    document.getElementById("mainContent").innerHTML = content;
}

window.onload = home;
