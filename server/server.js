require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = 3000;


// Дозволяємо серверу отримувати JSON

app.use(express.json());
app.get("/", function(req, res) {

    res.send("Flower Shop server работает!");

});


// Тест Telegram

app.get("/test-telegram", async function(req, res) {

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {

        const response = await fetch(url, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                chat_id: chatId,

                text: "🌷 Тестовое сообщение от Flower Shop!\n\nTelegram подключен успешно ❤️"

            })

        });

        const data = await response.json();

        console.log(data);

        if (data.ok) {

            res.send("Сообщение успешно отправлено в Telegram! 🌷");

        } else {

            res.status(500).send(
                "Ошибка Telegram: " + data.description
            );

        }

    } catch (error) {

        console.error(error);

        res.status(500).send(
            "Ошибка сервера: " + error.message
        );

    }

});


// ПРИНИМАЕМ ЗАКАЗ

app.post("/order", async function(req, res) {

    const order = req.body;

    console.log("Получен заказ:", order);


    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;


    const message = `
🌷 НОВЫЙ ЗАКАЗ!

👤 Имя и фамилия: ${order.name}
📞 Номер телефона: ${order.phone}
💬 Telegram: ${order.telegram}

🏙️ Город: ${order.city}
📍 Адрес доставки: ${order.address}

🚚 Доставка: ${order.delivery}
💳 Оплата: ${order.payment}

🛍️ ВАШ ЗАКАЗ:
${order.items}

💰 Итого: ${order.total} ₽
`;


    try {

        const response = await fetch(url, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                chat_id: chatId,

                text: message

            })

        });


        const data = await response.json();

        console.log(data);


        if (data.ok) {

            res.json({
                success: true
            });

        } else {

            res.status(500).json({

                success: false,
                error: data.description

            });

        }


    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            error: error.message

        });

    }

});


// ЗАПУСК СЕРВЕРА

app.listen(PORT, function() {

    console.log(
        `Сервер запущен: http://localhost:${PORT}`
    );

});
