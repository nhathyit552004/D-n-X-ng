"use strict";
function KiemTra() {
    // Lấy giá trị từ các trường nhập liệu
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const national = document.getElementById("national").value;
    // Lấy các phần tử thông báo lỗi
    const nameError = document.getElementById("error1");
    const phoneError = document.getElementById("error2");
    const genderError = document.getElementById("error3");
    const nationalError = document.getElementById("error4");
    const passwordError = document.getElementById("error6");
    const confirmPasswordError = document.getElementById("error7");
    // Xóa thông báo lỗi trước đó
    nameError.textContent = '';
    phoneError.textContent = '';
    genderError.textContent = '';
    nationalError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
    // Biến lưu trữ trạng thái lỗi
    let hasError = false;
    // Kiểm tra từng trường và hiển thị thông báo lỗi nếu cần
    if (!name) {
        nameError.textContent = 'Vui lòng nhập tên.';
        hasError = true;
    }
    if (!phone) {
        phoneError.textContent = 'Vui lòng nhập số điện thoại.';
        hasError = true;
    }
    if (!password) {
        passwordError.textContent = 'Vui lòng nhập mật khẩu.';
        hasError = true;
    }
    if (!confirmPassword) {
        confirmPasswordError.textContent = 'Vui lòng xác nhận mật khẩu.';
        hasError = true;
    }
    else if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Mật khẩu và xác nhận mật khẩu không khớp.';
        hasError = true;
    }
    if (!gender) {
        genderError.textContent = 'Vui lòng chọn giới tính.';
        hasError = true;
    }
    if (national === "0") {
        nationalError.textContent = 'Vui lòng chọn quốc tịch.';
        hasError = true;
    }
    // Nếu có lỗi, không gửi form
    if (hasError) {
        return false;
    }
    // Lưu thông tin người dùng vào localStorage (chỉ dùng để demo)
    localStorage.setItem("user", JSON.stringify({
        name: name,
        phone: phone,
        gender: gender ? gender.value : '', // Kiểm tra nếu gender tồn tại
        national: national,
        password: password
    }));
    // Hiển thị thông báo thành công
    const modal = document.getElementById("successModal");
    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = "Đăng ký thành công! Vui lòng đăng nhập.";
    modal.style.display = "block";
    // Chuyển hướng sau khi thông báo thành công
    setTimeout(function () {
        window.location.href = "dangnhap.html";
    }, 2000);
    return false; // Ngăn không cho gửi biểu mẫu
}
