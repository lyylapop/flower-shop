let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");

if (cartCount) {
    cartCount.textContent = cart.length;
}

// ДОДАВАННЯ ТОВАРУ В КОШИК

const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name = button.dataset.name;
        const price = button.dataset.price;

        // Визначаємо фото за назвою товару
        let image = "";

        if (name === "Букет «Нежность». 201 роза") {
            image = "201rose.jpg";
        }

        if (name === "Букет «Алексин». 11 роз") {
            image = "11rose.jpg";
        }

        if (name === "Букет «Софи спрей». 15 роз") {
            image = "rose15.jpg";
        }

        if (name === "Букет «Алексин спрей ред». 11 роз") {
            image = "red11rose.webp";
        }

        if (name === "Букет «Lovely sun»") {
            image = "sun.jpg";
        }

        if (name === "Букет «Гранд»") {
            image = "grand.jpg";
        }

        const existingItem = cart.find(function(item) {
    return item.name === name;
});

if (existingItem) {

    existingItem.quantity += 1;

} else {

    cart.push({
        name: name,
        price: price,
        image: image,
        quantity: 1
    });

}

        localStorage.setItem("cart", JSON.stringify(cart));

        const cartMessage = document.getElementById("cart-message");

if (cartMessage) {

    cartMessage.classList.add("show");

    setTimeout(function() {

        cartMessage.classList.remove("show");

    }, 2500);

}

    });

});


// ВІДОБРАЖЕННЯ КОШИКА

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

if (cartItems) {

    let total = 0;

    cart.forEach(function(item, index) {

        const product = document.createElement("div");
        product.classList.add("cart-item");


        // ФОТО

        const image = document.createElement("img");

        image.src = item.image;
        image.alt = item.name;
        image.classList.add("cart-item-image");


        // ІНФОРМАЦІЯ

        const productInfo = document.createElement("div");
        productInfo.classList.add("cart-item-info");

        const productName = document.createElement("h3");
        productName.textContent = item.name;

        const productPrice = document.createElement("p");
       productPrice.textContent =
    item.price + " ₽ × " + (item.quantity || 1);

        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);

        const quantityBox = document.createElement("div");

quantityBox.classList.add("quantity-box");

const minusButton = document.createElement("button");

minusButton.textContent = "−";

minusButton.classList.add("quantity-button");

const quantityText = document.createElement("span");

quantityText.textContent = item.quantity || 1;

quantityText.classList.add("quantity-number");

const plusButton = document.createElement("button");

plusButton.textContent = "+";

plusButton.classList.add("quantity-button");


minusButton.addEventListener("click", function() {

    if ((item.quantity || 1) > 1) {

        item.quantity -= 1;

    } else {

        cart.splice(index, 1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

});


plusButton.addEventListener("click", function() {

    item.quantity = (item.quantity || 1) + 1;

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

});


quantityBox.appendChild(minusButton);

quantityBox.appendChild(quantityText);

quantityBox.appendChild(plusButton);

productInfo.appendChild(quantityBox);


        // КНОПКА ВИДАЛЕННЯ

        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "🗑️";

        deleteButton.addEventListener("click", function() {

            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));
            if (cartCount) {
    cartCount.textContent = cart.length;
}
            location.reload();

        });


        // ДОДАЄМО ЕЛЕМЕНТИ

        product.appendChild(image);
        product.appendChild(productInfo);
        product.appendChild(deleteButton);

        cartItems.appendChild(product);


        // ЗАГАЛЬНА СУМА

        total += Number(item.price) * (item.quantity || 1);
    });

    cartTotal.textContent = total;

}
// ФІЛЬТР КАТЕГОРІЙ

const categoryButtons = document.querySelectorAll(".category-button");
const productCards = document.querySelectorAll(".product-card");

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedCategory = button.dataset.category;


        // Активна кнопка

        categoryButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        // Показуємо потрібні товари

        productCards.forEach(function(card) {

            const cardCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                cardCategory === selectedCategory
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});