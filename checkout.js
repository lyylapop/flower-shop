// ОФОРМЛЕНИЕ ЗАКАЗА

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");


// ПОКАЗЫВАЕМ ТОВАРЫ ИЗ КОРЗИНЫ

let total = 0;

if (checkoutItems) {

    cart.forEach(function(item) {

        const product = document.createElement("div");
        product.classList.add("checkout-item");


        // ФОТО

        const image = document.createElement("img");

        image.src = item.image;
        image.alt = item.name;
        image.classList.add("checkout-item-image");


        // ИНФОРМАЦИЯ

        const productInfo = document.createElement("div");
        productInfo.classList.add("checkout-item-info");

        const productName = document.createElement("h3");
        productName.textContent = item.name;

        const productPrice = document.createElement("p");
        productPrice.textContent = item.price + " ₽";

        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);


        product.appendChild(image);
        product.appendChild(productInfo);

        checkoutItems.appendChild(product);


        total += Number(item.price);

    });


    checkoutTotal.textContent = total;

}


// ОФОРМЛЕНИЕ ЗАКАЗА

const checkoutForm = document.querySelector(".checkout-form");
const checkoutMessage = document.getElementById("checkout-message");


if (checkoutForm) {

    checkoutForm.addEventListener("submit", async function(event) {

        event.preventDefault();


        // Получаем данные формы

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const telegram = document.getElementById("telegram").value;
        const city = document.getElementById("city").value;
        const address = document.getElementById("address").value;
        const delivery = document.querySelector(
            'input[name="delivery"]:checked'
        ).value;
        const payment = document.getElementById("payment").value;


        // Формируем список товаров

        let items = "";

        cart.forEach(function(item) {

            items +=
                "• " +
                item.name +
                " — " +
                item.price +
                " ₽\n";

        });


        // Отправляем заказ на сервер

        try {

            const response = await fetch(
                "https://flower-shop-server-08ew.onrender.com/order",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,
                        phone: phone,
                        telegram: telegram,
                        city: city,
                        address: address,
                        delivery: delivery,
                        payment: payment,
                        items: items,
                        total: total

                    })

                }
            );


            const data = await response.json();


            if (data.success) {

                checkoutMessage.style.display = "block";

                checkoutMessage.textContent =
                    "Спасибо за заказ! Мы свяжемся с вами в Telegram для подтверждения.";


                checkoutForm
                    .querySelector(".checkout-submit")
                    .style.display = "none";


                // Очищаем корзину

                localStorage.removeItem("cart");

            } else {

                alert(
                    "Не удалось отправить заказ: " +
                    data.error
                );

            }


        } catch (error) {

            console.error(error);

            alert(
                "Не удалось подключиться к серверу."
            );

        }

    });

}