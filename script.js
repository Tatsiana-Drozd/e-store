const items = [{
        title: "Adamex",
        description: "Производитель Польша",
        tags: ["люлька", "прогулка"],
        price: 500,
        img: "./img/stroller_adamex.jpg",
        rating: 5,
    },
    {
        title: "Anex",
        description: "Производство Германия",
        tags: ["люлька"],
        price: 900,
        img: "./img/stroller_anex.jpg",
        rating: 4.5,
    },
    {
        title: "Bugaboo",
        description: "Производство Италия",
        tags: ["люлька", "прогулка"],
        price: 300,
        img: "./img/stroller_Bugaboo.jpg",
        rating: 3.8,
    },
    {
        title: "Bumbleride",
        description: "Производство Италия",
        tags: ["люлька", "прогулка"],
        price: 660,
        img: "./img/stroller_Bumbleride.jpg",
        rating: 4.7,
    },
    {
        title: "Cybex",
        description: "Производство Италия",
        tags: ["прогулка"],
        price: 400,
        img: "./img/stroller_CYBEX.jpg",
        rating: 2.8,
    },
    {
        title: "EGG",
        description: "Производство Германия",
        tags: ["люлька"],
        price: 200,
        img: "./img/stroller_EGG.jpg",
        rating: 4.7,
    },
    {
        title: "Maxi-Cosi",
        description: "Производство Польша",
        tags: ["люлька", "прогулка"],
        price: 300,
        img: "./img/stroller_Maxi-Cosi.jpg",
        rating: 4.2,
    },
    {
        title: "Noordi",
        description: "Теперь вы можете не переживать за личные вещи",
        tags: ["прогулка"],
        price: 500,
        img: "./img/stroller_Noordi.jpg",
        rating: 2.3,
    },
    {
        title: "Pituso",
        description: "Производство Италия",
        tags: ["люлька"],
        price: 1500,
        img: "./img/stroller_Pituso.jpg",
        rating: 4.5,
    },
    {
        title: "Roan",
        description: "Произволство Беларусь",
        tags: ["люлька", "прогулка"],
        price: 800,
        img: "./img/stroller_Roan.jpg",
        rating: 5,
    },
    {
        title: "Tutis",
        description: "Производство Польша",
        tags: ["люлька", "прогулка"],
        price: 3500,
        img: "./img/stroller_Tutis.jpg",
        rating: 3.3,
    },
    {
        title: "Doona",
        description: "Производство Франция",
        tags: ["люлька"],
        price: 800,
        img: "./img/car_seat_doona.jpg",
        rating: 4.8,
    },
];

// Товары после применения поиска / фильтров
// которые мы будем показывать пользователю
let currentState = [...items];

// Переменная с контейнером для товаров
const itemsContainer = document.querySelector("#shop-items");
// Шаблон для товара
const itemTemplate = document.querySelector("#item-template");
// Текст, если ничего не найдено
const nothingFound = document.querySelector("#nothing-found");

// Функция для отрисовки
// В качестве параметра — товары, которые нужно отрисовать
function renderItems(arr) {
    // Сбрасываем текст "Ничего не найдено" после предыдущего поиска
    nothingFound.textContent = "";
    // И чистим контейнер с товарами на случай, если там что-то было
    itemsContainer.innerHTML = "";
    // Отрисовываем товары из переданного параметра arr
    arr.forEach((item) => {
        // Вызываем prepareShopItem для каждого товара
        // И подставляем результат в верстку
        itemsContainer.append(prepareShopItem(item));
    });
    // Если массив товаров пустой, отображаем текст, что ничего не нашлось
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

// Функция-хелпер для сортировки товаров по алфавиту
function sortByAlphabet(a, b) {
    // Смотрим на свойство title
    // Если title первого товара алфавитно больше второго...
    if (a.title > b.title) {
        return 1;
    }
    // Если title второго товара больше
    if (a.title < b.title) {
        return -1;
    }
    // Если они равны
    return 0;
}

// Вызываем функцию для отрисовки в самом начале
// И тут же сортируем по алфавиту
renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

// Функция для создания верстки конкретного товара
function prepareShopItem(shopItem) {
    // Деструктурируем свойства объекта
    const { title, description, tags, img, price, rating } = shopItem;
    // Берем за основу шаблон товара
    const item = itemTemplate.content.cloneNode(true);
    // Наполняем его информацией из объекта
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;

    // Находим контейнер для рейтинга
    const ratingContainer = item.querySelector(".rating");
    // Рисуем нужное количество звездочек
    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }

    // Находим шаблон для тегов
    const tagsHolder = item.querySelector(".tags");

    // Отрисовываем теги для товара
    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });

    // Возвращаем HTML-элемент
    return item;
}

// Инпут для поиска
const searchInput = document.querySelector("#search-input");
// Кнопка
const searchButton = document.querySelector("#search-btn");

// Функция для поиска по товарам (сбрасывает фильтры)
function applySearch() {
    // Взяли значение инпута и "причесали" его
    // Привели к нижнему регистру, чтобы написание не мешало поиску
    const searchString = searchInput.value.trim().toLowerCase();

    // Нашли все товары, в title которых есть searchString
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    // Отсортировали их по алфавиту
    currentState.sort((a, b) => sortByAlphabet(a, b));
    // Отрисовали результаты поиска
    renderItems(currentState);
    // По умолчанию сортировка "по алфавиту"
    sortControl.selectedIndex = 0;
}

// Обработчик при клике на кнопку поиска
searchButton.addEventListener("click", applySearch);
// Обработчик события поиска при взаимодействии с инпутом
searchInput.addEventListener("search", applySearch);

// Селект с опциями сортировки
const sortControl = document.querySelector("#sort");
// Обработчик события выбора опции из селекта
sortControl.addEventListener("change", (event) => {
    // Атрибут value опции селекта, что выбрал пользователь
    const selectedOption = event.target.value;
    // В зависимости от вида сортировки упорядочиваем массив товаров
    switch (selectedOption) {
        case "expensive":
            {
                // Сначала дорогие
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                // Сначала дешевые
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                // От более высокого рейтинга к более низкому
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                // По алфавиту
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    // Массив упорядочили — осталось его отрисовать
    renderItems(currentState);
});