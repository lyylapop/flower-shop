document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".category-button");
    const cards = document.querySelectorAll(".product-card");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Переключение активной кнопки
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.getAttribute("data-category");

            // Фильтрация карточек
            cards.forEach(card => {
                if (filter === "all") {
                    card.style.display = "flex";
                } else {
                    const categories = card.getAttribute("data-category").split(" ");
                    if (categories.includes(filter)) {
                        card.style.display = "flex";
                    } else {
                        card.style.display = "none";
                    }
                }
            });
        });
    });
});
