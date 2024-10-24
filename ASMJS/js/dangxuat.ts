// dangxuat.js

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'dangnhap.html'; // Chuyển hướng về trang đăng nhập
}
