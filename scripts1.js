document.addEventListener('DOMContentLoaded', function() {
    const products = generateProducts(10000);
    const productGrid = document.getElementById('product-grid');
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const prevSlideBtn = document.getElementById('prev-slide');
    const nextSlideBtn = document.getElementById('next-slide');
    let cart = [];
    let currentPage = 0;
    const productsPerPage = 12;

    function generateProducts(count) {
        let products = [];
        for (let i = 1; i <= count; i++) {
            products.push({
                id: i,
                name: `Product ${i}`,
                vendor: `Vendor ${Math.ceil(i / 5)}`,
                price: (Math.random() * 100).toFixed(2),
                image: `https://via.placeholder.com/150?text=Product+${i}`
            });
        }
        return products;
    }

    function renderProducts(products) {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Vendor: ${product.vendor}</p>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productGrid.appendChild(productElement);
        });
    }

    function getPaginatedProducts() {
        const start = currentPage * productsPerPage;
        const end = start + productsPerPage;
        return products.slice(start, end);
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        cartCount.innerText = cart.length;
        renderCartItems();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.innerText = `${item.name} - $${item.price}`;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    window.toggleCartModal = function() {
        cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
    }

    cartBtn.addEventListener('click', toggleCartModal);

    function slide(direction) {
        if (direction === 'next' && currentPage < Math.ceil(products.length / productsPerPage) - 1) {
            currentPage++;
        } else if (direction === 'prev' && currentPage > 0) {
            currentPage--;
        }
        renderProducts(getPaginatedProducts());
        updateSlideNumber();
    }

    function updateSlideNumber() {
        const slideNumber = document.getElementById('slide-number');
        slideNumber.textContent = `${currentPage + 1}/${Math.ceil(products.length / productsPerPage)}`;
    }

    // Event listeners for slide buttons
    prevSlideBtn.addEventListener('click', () => slide('prev'));
    nextSlideBtn.addEventListener('click', () => slide('next'));

    renderProducts(getPaginatedProducts());
    updateSlideNumber(); // Update slide number initially

    // Auto-slide functionality
    setInterval(() => {
        slide('next');
    }, 8000); // Change slide every 8 seconds
});