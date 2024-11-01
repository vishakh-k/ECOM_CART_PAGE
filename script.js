document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 18.99 },
        { id: 3, name: "Product 3", price: 23.99 },
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    // Render products list
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `<span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to cart</button>`;

        productList.appendChild(productDiv);
    });

    // Render existing cart items on page load
    cart.forEach(product => renderCart(product));

    // Add event listener to add product to cart
    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    // Function to add product to cart
    function addToCart(product) {
        cart.push(product);
        saveItems();
        renderCart(product);
    }

    // Function to render cart items
    function renderCart(product) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.setAttribute('data-id', product.id);
        cartItem.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button class="remove-btn">Remove</button>
        `;

        // Add click listener for removing the product from the cart
        cartItem.querySelector('.remove-btn').addEventListener('click', () => {
            cart = cart.filter(item => item.id !== product.id);
            cartItem.remove();
            saveItems();
            updateCartDisplay();
        });

        cartItems.appendChild(cartItem);
        updateCartDisplay();
    }

    // Function to update the total price and display
    function updateCartDisplay() {
        let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;

        if (cart.length > 0) {
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');
        } else {
            emptyCartMessage.classList.remove('hidden');
            cartTotalMessage.classList.add('hidden');
            totalPriceDisplay.textContent = "$0.00";
        }
    }

    // Save cart items to localStorage
    function saveItems() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Checkout button event listener
    checkOutBtn.addEventListener("click", () => {
        cart.length = 0;
        alert("Checked out successfully");
        saveItems();
        cartItems.innerHTML = '';  // Clear the cart display
        updateCartDisplay();
    });
});
