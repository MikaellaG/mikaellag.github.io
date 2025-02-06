const productList = document.getElementById('productList');
const errorMessage = document.getElementById('errorMessage');
const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');

// Function to fetch Maybelline products
function fetchMaybellineProducts(searchTerm = '') {
    const url = `https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&product_type=${searchTerm}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Clear any existing error message
            errorMessage.textContent = '';
            if (data.length === 0) {
                errorMessage.textContent = `No products found for "${searchTerm}"`;
            } else {
                displayProducts(data);
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            errorMessage.textContent = 'Failed to load products. Please try again later.';
        });
}

// Function to display products in the HTML
function displayProducts(products) {
    productList.innerHTML = ''; // Clear existing products
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // Create product card HTML
        productCard.innerHTML = `
            <img src="${product.image_link}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price || 'Price not available'}</p>
            <p>${product.category || 'Category not available'}</p>
        `;
        
        // Append product card to the list
        productList.appendChild(productCard);
    });
}

// Function to handle search on button click
function handleSearchButtonClick() {
    const searchTerm = searchBar.value.trim().toLowerCase();
    
    if (searchTerm) {
        fetchMaybellineProducts(searchTerm);
    } else {
        // If no search term, fetch all products
        fetchMaybellineProducts();
    }
}

// Event listener for the search button click
searchBtn.addEventListener('click', handleSearchButtonClick);

// Fetch all products when the page loads
window.onload = fetchMaybellineProducts;
