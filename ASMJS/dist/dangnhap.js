"use strict";
function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const storedUser = JSON.parse(localStorage.getItem("user") || 'null');
    if (!storedUser || storedUser.phone !== username || storedUser.password !== password) {
        document.getElementById("loginError1").textContent = "Tên đăng nhập hoặc mật khẩu không đúng.";
        return false;
    }
    // Save login state (this is just a demo, usually done with sessions on the server)
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
    return false;
}
