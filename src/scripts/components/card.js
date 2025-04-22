import {cardsContainer, cardTemplate, imagePopup} from "../index";
import {openModal} from "./modal";

function removeCard(cardElement) {
    cardElement.remove();
}

export function createCard(cardInfo) {
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