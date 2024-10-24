"use strict";
let slideIndex = 0;
showSlides();
function showSlides() {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}
function currentSlide(n) {
    slideIndex = n;
    showSlides();
}
// Khởi tạo giỏ hàng từ Local Storage
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productId, productName, productPrice) {
    const product = { id: productId, name: productName, price: productPrice, quantity: 1 };
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex >= 0) {
        // Nếu có, tăng số lượng
        cart[existingProductIndex].quantity += 1;
    }
    else {
        // Nếu không, thêm sản phẩm mới vào giỏ hàng
        cart.push(product);
    }
    // Cập nhật giỏ hàng trong Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
}
// Thêm sự kiện cho tất cả các nút "Thêm Vào Giỏ"
document.querySelectorAll('.btn.btn-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id') || '';
        const productName = button.getAttribute('data-product-name') || '';
        const productPrice = parseFloat(button.getAttribute('data-product-price') || '0');
        addToCart(productId, productName, productPrice);
    });
});
// Xử lý đăng nhập và đăng xuất
document.addEventListener('DOMContentLoaded', function () {
    const authSection = document.getElementById('authSection');
    if (authSection) {
        if (localStorage.getItem('loggedIn')) {
            authSection.innerHTML = `
                <button class="logout"><a href="#" onclick="logout()">Đăng xuất</a></button>
            `;
        }
        else {
            authSection.innerHTML = `
                <a href="dangnhap.html">Đăng nhập</a> |
                <a href="dangky.html">Đăng ký</a>
            `;
        }
    }
});
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.reload();
}
