let slideIndex: number = 0;
showSlides();

function showSlides(): void {
    const slides: HTMLCollectionOf<Element> = document.getElementsByClassName("mySlides");
    const dots: HTMLCollectionOf<Element> = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        (slides[i] as HTMLElement).style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }    

    for (let i = 0; i < dots.length; i++) {
        (dots[i] as HTMLElement).className = (dots[i] as HTMLElement).className.replace(" active", "");
    }
    (slides[slideIndex - 1] as HTMLElement).style.display = "block";  
    (dots[slideIndex - 1] as HTMLElement).className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

function currentSlide(n: number): void {
    slideIndex = n;
    showSlides();
}

// Khởi tạo giỏ hàng từ Local Storage
let cart: Array<{ id: string; name: string; price: number; quantity: number }> = JSON.parse(localStorage.getItem('cart') || '[]');

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productId: string, productName: string, productPrice: number): void {
    const product = { id: productId, name: productName, price: productPrice, quantity: 1 };
    
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex: number = cart.findIndex(item => item.id === productId);
    if (existingProductIndex >= 0) {
        // Nếu có, tăng số lượng
        cart[existingProductIndex].quantity += 1;
    } else {
        // Nếu không, thêm sản phẩm mới vào giỏ hàng
        cart.push(product);
    }
    
    // Cập nhật giỏ hàng trong Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
}

// Thêm sự kiện cho tất cả các nút "Thêm Vào Giỏ"
document.querySelectorAll('.btn.btn-cart').forEach((button: Element) => {
    button.addEventListener('click', () => {
        const productId: string = (button as HTMLElement).getAttribute('data-product-id') || '';
        const productName: string = (button as HTMLElement).getAttribute('data-product-name') || '';
        const productPrice: number = parseFloat((button as HTMLElement).getAttribute('data-product-price') || '0');

        addToCart(productId, productName, productPrice);
    });
});

// Xử lý đăng nhập và đăng xuất
document.addEventListener('DOMContentLoaded', function() {
    const authSection: HTMLElement | null = document.getElementById('authSection');

    if (authSection) {
        if (localStorage.getItem('loggedIn')) {
            authSection.innerHTML = `
                <button class="logout"><a href="#" onclick="logout()">Đăng xuất</a></button>
            `;
        } else {
            authSection.innerHTML = `
                <a href="dangnhap.html">Đăng nhập</a> |
                <a href="dangky.html">Đăng ký</a>
            `;
        }
    }
});

function logout(): void {
    localStorage.removeItem('loggedIn');
    window.location.reload();
}
