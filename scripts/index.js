// @todo: Темплейт карточки

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

function profilePopupContent(profilePopup) {
    const profileTitle = document.querySelector('.profile__title').textContent;
    const profileDescription = document.querySelector('.profile__description').textContent;

    profilePopup.querySelector('.popup__input_type_name').value = profileTitle;
    profilePopup.querySelector('.popup__input_type_description').value = profileDescription;
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

profileEditButton.addEventListener('click', () => {
    profilePopupContent(profilePopup);
    openModal(profilePopup);
})

profileAddButton.addEventListener('click', () => {
    openModal(cardPopup);
})

// Add close button EventListener for every popup__close btn element

document.querySelectorAll('.popup__close').forEach(button => button.addEventListener('click', (evt) => {
    const eventTarget = evt.target.parentElement.parentElement;
    closeModal(eventTarget);
}));

// Change Profile Info

// Находим форму в DOM
const profileFormElement = document.querySelector('.popup__form')// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = profileFormElement.querySelector('.popup__input_type_name')// Воспользуйтесь инструментом .querySelector()
const jobInput = profileFormElement.querySelector('.popup__input_type_description')// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function handleProfileFormSubmit(evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        // Так мы можем определить свою логику отправки.
        // О том, как это делать, расскажем позже.

        // Получите значение полей jobInput и nameInput из свойства value
        const name = nameInput.value;
        const job = jobInput.value;

        // Выберите элементы, куда должны быть вставлены значения полей

        const profileTitle = document.querySelector('.profile__title');
        const profileDescription = document.querySelector('.profile__description');

        // Вставьте новые значения с помощью textContent

        profileTitle.textContent = name;
        profileDescription.textContent = job;

        closeModal(profilePopup);
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Animation add-on

const popups = document.querySelectorAll('.popup');

popups.forEach(popup => popup.classList.add('popup_is-animated'));

// @todo: Функция создания карточки

// Clone template and return it filled with info from array above

function createCard(cardInfo) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");

    cardImage.src = cardInfo.link;

    cardTitle.textContent = cardInfo.name;
    cardImage.alt = `Изображение: ${cardInfo.name}`;


    cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like-button_is-active');
    })

    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {
        removeCard(evt.target.closest('li.places__item'));
    })

    cardImage.addEventListener('click', () => {
        imagePopup.querySelector('.popup__image').src = cardInfo.link;
        openModal(imagePopup);
    });

    cardsContainer.prepend(cardElement);
}

// Находим форму в DOM
const cardFormContainer = document.querySelector('.popup_type_new-card');
const cardFormElement = cardFormContainer.querySelector('.popup__form')// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const placeNameInput = cardFormElement.querySelector('.popup__input_type_card-name')// Воспользуйтесь инструментом .querySelector()
const urlInput = cardFormElement.querySelector('.popup__input_type_url')// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleCardFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const placeName = placeNameInput.value;
    const url = urlInput.value;

    createCard({
        name: `${placeName}`,
        link: `${url}`,
    });

    closeModal(cardPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// @todo: Функция удаления карточки

function removeCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (cardInfo) {
    createCard(cardInfo);
});
