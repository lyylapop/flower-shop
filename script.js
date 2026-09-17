let cart = JSON.parse(localStorage.getItem("cart")) || [];


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

        cart.push({
            name: name,
            price: price,
            image: image
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(name + " — " + price + " ₽ добавлен в корзину!");

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
        productPrice.textContent = item.price + " ₽";

        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);


        // КНОПКА ВИДАЛЕННЯ

        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "🗑️";

        deleteButton.addEventListener("click", function() {

            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));

            location.reload();

        });


        // ДОДАЄМО ЕЛЕМЕНТИ

        product.appendChild(image);
        product.appendChild(productInfo);
        product.appendChild(deleteButton);

        cartItems.appendChild(product);


        // ЗАГАЛЬНА СУМА

        total += Number(item.price);

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