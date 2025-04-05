ddocument.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productImage = document.getElementById('product-image').files[0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${e.target.result}" alt="${productName}">
            <h3>${productName}</h3>
            <p>Цена: ${productPrice} ₽</p>
            <button class="add-to-cart-btn">🛒</button> <!-- Эмодзи корзины -->
        `;
        document.querySelector('.products').appendChild(productCard);

        // Добавляем обработчик события для кнопки "Добавить в корзину"
        productCard.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            addToCart({ name: productName, price: parseInt(productPrice) });
        });
    };
    reader.readAsDataURL(productImage);

    // Очистка формы
    document.getElementById('product-form').reset();
});
// Функция для добавления товара в корзину
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.push(product);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`${product.name} добавлен в корзину!`);
    
    updateCartCount(); // Обновляем счетчик товаров в корзине
}

// Функция для обновления счетчика товаров в корзине
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = cart.length; 
    } else {
        console.error("Элемент с ID 'cart-count' не найден.");
    }
}

// Вызываем функцию обновления счетчика при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});