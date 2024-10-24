"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Function to add product to the cart and redirect to cart page
    function addToCart(productId, productName, productPrice, productImage) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        }
        else {
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage
            };
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'giohang.html'; // Redirect to cart page
    }
    // Function to update the cart display
    function updateCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const totalElement = document.getElementById('money');
        cartItemsContainer.innerHTML = '';
        let total = 0;
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.forEach((item, index) => {
            const itemElement = document.createElement('tr');
            itemElement.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>
                    <button onclick="decreaseQuantity(${index})">-</button>
                    ${item.quantity}
                    <button onclick="increaseQuantity(${index})">+</button>
                </td>
                <td>${(item.price * item.quantity).toLocaleString()} VND</td>
                <td><button onclick="removeFromCart(${index})">Xóa</button></td>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        totalElement.innerText = `${total.toLocaleString()} VND`;
    }
    // Function to increase product quantity
    function increaseQuantity(index) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
    // Function to decrease product quantity
    function decreaseQuantity(index) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        }
        else {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
    // Function to remove product from the cart
    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
    // Add event listeners to all add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('.btn-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const productId = button.getAttribute('data-id');
            const productName = button.getAttribute('data-name');
            const productPrice = parseInt(button.getAttribute('data-price'));
            const productImage = button.getAttribute('data-image');
            addToCart(productId, productName, productPrice, productImage);
        });
    });
    // Initial update of the cart display
    updateCart();
});
