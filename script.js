document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-button');
    const productCards = document.querySelectorAll('.product-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем класс active у всех кнопок
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем класс active текущей кнопке
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Показываем или скрываем карточки товаров
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
