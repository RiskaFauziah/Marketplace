document.addEventListener("DOMContentLoaded", function () {
    /* ================================
       1. Produk di Marketplace
    ================================ */
    const products = [
        { name: "Flour", price: "$10", stock: 50 },
        { name: "Sugar", price: "$5", stock: 0 },
        { name: "Milk", price: "$15", stock: 30 },
    ];

    const productList = document.getElementById("product-list");
    const searchBar = document.getElementById("search-bar");
    const filterStock = document.getElementById("filter-stock");

    const renderProducts = (filteredProducts) => {
        productList.innerHTML = ""; // Bersihkan daftar produk
        filteredProducts.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Stock: ${product.stock > 0 ? product.stock : "Out of Stock"}</p>
                <button class="buy-btn" ${product.stock === 0 ? "disabled" : ""}>Buy</button>
            `;
            productList.appendChild(productDiv);
        });
    };

    const filterProducts = () => {
        const searchQuery = searchBar.value.toLowerCase();
        const stockFilter = filterStock.value;

        const filtered = products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery);
            const matchesStock =
                stockFilter === "all" ||
                (stockFilter === "in-stock" && product.stock > 0) ||
                (stockFilter === "out-of-stock" && product.stock === 0);
            return matchesSearch && matchesStock;
        });

        renderProducts(filtered);
    };

    if (productList && searchBar && filterStock) {
        searchBar.addEventListener("input", filterProducts);
        filterStock.addEventListener("change", filterProducts);
        renderProducts(products);
    }

    /* ================================
       2. Tombol Beli Produk
    ================================ */
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("buy-btn")) {
            const productName = e.target.parentElement.querySelector("h3").textContent;

            // Cari produk yang sesuai
            const product = products.find((p) => p.name === productName);
            if (product && product.stock > 0) {
                product.stock -= 1; // Kurangi stok
                alert(`Thank you for purchasing ${product.name}!`);

                // Render ulang produk untuk memperbarui stok
                filterProducts();
            }
        }
    });

    /* ================================
       3. Manajemen Inventaris
    ================================ */
    const inventoryForm = document.getElementById("inventory-form");
    const inventoryList = document.getElementById("inventory-list");

    if (inventoryForm) {
        inventoryForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const itemName = document.getElementById("item-name").value.trim();
            const itemQuantity = parseInt(
                document.getElementById("item-quantity").value
            );
            const errorDiv = document.getElementById("form-error");

            if (!itemName || itemQuantity <= 0) {
                errorDiv.textContent =
                    "Please enter a valid item name and quantity!";
                return;
            }

            // Clear error message
            errorDiv.textContent = "";

            // Tambahkan item ke daftar inventaris
            const li = document.createElement("li");
            li.textContent = `${itemName} - Quantity: ${itemQuantity}`;
            inventoryList.appendChild(li);

            // Kosongkan form
            inventoryForm.reset();
        });
    }

    /* ================================
       4. Pesanan Terbaru di Dashboard
    ================================ */
    const orderList = document.getElementById("order-list");

    if (orderList) {
        const orders = [
            { id: 1, item: "Flour", quantity: 10, date: "2024-12-15" },
            { id: 2, item: "Sugar", quantity: 20, date: "2024-12-14" },
            { id: 3, item: "Milk", quantity: 5, date: "2024-12-13" },
        ];

        orders.forEach((order) => {
            const li = document.createElement("li");
            li.textContent = `Order #${order.id}: ${order.item} x ${order.quantity} (Date: ${order.date})`;
            orderList.appendChild(li);
        });
    }

    /* ================================
       5. Login Form
    ================================ */
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (username === "admin" && password === "password") {
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid username or password!");
            }
        });
    }

    /* ================================
       6. Sign Up Form
    ================================ */
    const signupForm = document.getElementById("signup-form");

    if (signupForm) {
        const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isValidPassword = (password) => password.length >= 6;

        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirm-password").value.trim();

            if (!username || !email || !password || !confirmPassword) {
                alert("All fields are required!");
                return;
            }

            if (!isValidEmail(email)) {
                alert("Invalid email format!");
                return;
            }

            if (!isValidPassword(password)) {
                alert("Password must be at least 6 characters long!");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            alert("Sign up successful! You can now log in.");
            window.location.href = "login.html";
        });
    }
});
