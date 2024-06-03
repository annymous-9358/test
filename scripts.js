document.addEventListener('DOMContentLoaded', function() {
    const categoryContainer = document.getElementById('category-container');
    const productContainer = document.getElementById('product-container');
    const cartContainer = document.getElementById('cart-container');
    let currentCategory = null; // To keep track of current category/subcategory
    let cartItems = []; // To store the items in the cart

    // Sample categories with names, images, and subcategories
    const mainCategories = [
        {
            name: 'Electronics',
            image: 'electronics.jpg',
            subcategories: ['Mobile Phones', 'Laptops', 'Tablets', 'Televisions', 'Cameras']
        },
        {
            name: 'Clothing',
            image: 'clothing.jpg',
            subcategories: ["Men's Clothing", "Women's Clothing", "Kids Clothing", "Shoes", "Accessories"]
        },
        {
            name: 'Furniture',
            image: 'furniture.jpg',
            subcategories: ['Sofas', 'Beds', 'Tables', 'Chairs', 'Cabinets']
        },
        {
            name: 'Sports',
            image: 'sports.jpg',
            subcategories: ['Football', 'Basketball', 'Tennis', 'Golf', 'Running']
        },
        {
            name: 'Books',
            image: 'books.jpg',
            subcategories: ['Fiction', 'Non-Fiction', 'Thriller', 'Romance', 'Science Fiction']
        }
        // Add more main categories here
    ];

    // Sample products with names and prices
    const productsBySubcategory = {
        'Mobile Phones': [
            { name: 'iPhone 12', price: '$999' },
            { name: 'Samsung Galaxy S21', price: '$899' },
            { name: 'Google Pixel 5', price: '$699' }
        ],
        'Laptops': [
            { name: 'MacBook Pro', price: '$1299' },
            { name: 'Dell XPS 13', price: '$1099' },
            { name: 'HP Spectre x360', price: '$1199' }
        ],
        'Tablets': [
            { name: 'iPad Pro', price: '$799' },
            { name: 'Samsung Galaxy Tab S7', price: '$649' },
            { name: 'Microsoft Surface Pro 7', price: '$899' }
        ],
        'Televisions': [
            { name: 'Samsung QLED 4K TV', price: '$1499' },
            { name: 'LG OLED TV', price: '$1999' },
            { name: 'Sony Bravia 4K TV', price: '$1799' }
        ],
        'Cameras': [
            { name: 'Canon EOS R5', price: '$3899' },
            { name: 'Sony Alpha a7 III', price: '$1999' },
            { name: 'Nikon Z7 II', price: '$2999' }
        ],
        // Dummy products for other subcategories
        'Men\'s Clothing': [
            { name: 'T-Shirt', price: '$20' },
            { name: 'Jeans', price: '$40' },
            { name: 'Jacket', price: '$60' }
        ],
        'Women\'s Clothing': [
            { name: 'Dress', price: '$50' },
            { name: 'Skirt', price: '$30' },
            { name: 'Blouse', price: '$25' }
        ],
        'Football': [
            { name: 'Football', price: '$30' },
            { name: 'Football Shoes', price: '$60' },
            { name: 'Goalkeeper Gloves', price: '$40' }
        ],
        'Fiction': [
            { name: 'The Great Gatsby', price: '$15' },
            { name: 'To Kill a Mockingbird', price: '$12' },
            { name: '1984', price: '$10' }
        ]
        // Add more dummy products for other subcategories here
    };

    // Function to render main categories
    function renderMainCategories() {
        categoryContainer.innerHTML = ''; // Clear previous categories
        mainCategories.forEach(category => {
            const div = document.createElement('div');
            div.className = 'grid-item';
            div.innerHTML = `
                <img src="images/${category.image}" alt="${category.name}">
                <h2>${category.name}</h2>
            `;
            div.addEventListener('click', function() {
                renderSubcategories(category);
                currentCategory = category;
            });
            categoryContainer.appendChild(div);
        });
    }

    // Function to render subcategories
    function renderSubcategories(category) {
        categoryContainer.innerHTML = ''; // Clear previous categories
        const backButton = document.createElement('button');
        backButton.innerText = 'Back';
        backButton.addEventListener('click', function() {
            renderMainCategories();
            currentCategory = null;
            backButton.remove();
        });
        categoryContainer.appendChild(backButton);
        category.subcategories.forEach(subcategory => {
            const div = document.createElement('div');
            div.className = 'grid-item';
            div.innerHTML = `
                <h3>${subcategory}</h3>
            `;
            div.addEventListener('click', function() {
                renderProducts(subcategory);
                currentCategory = subcategory;
            });
            categoryContainer.appendChild(div);
        });
    }

    // Function to render products
    function renderProducts(subcategory) {
        productContainer.innerHTML = ''; // Clear previous products
        const products = productsBySubcategory[subcategory];
        if (products) {
            products.forEach(product => {
                const div = document.createElement('div');
                div.className = 'grid-item';
                div.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Price: ${product.price}</p>
                    <button class="addToCartButton">Add to Cart</button>
                `;
                const addToCartButton = div.querySelector('.addToCartButton');
                addToCartButton.addEventListener('click', function() {
                    addToCart(product);
                });
                productContainer.appendChild(div);
            });
        } else {
            productContainer.innerHTML = '<p>No products available for this category</p>';
        }
    }

    // Function to add product to cart
    function addToCart(product) {
        cartItems.push(product);
        renderCart();
    }

    // Function to render cart
    function renderCart() {
        cartContainer.innerHTML = ''; // Clear previous cart items
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <p>${item.name} - ${item.price}</p>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    // Initial rendering of main categories
    renderMainCategories();
});
