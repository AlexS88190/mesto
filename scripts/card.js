import { openPopup } from './utils.js'

const popupZoom = document.querySelector('.popup_type_zoom');
const popupZoomImage = popupZoom.querySelector('.popup__image');
const popupZoomTitle = popupZoom.querySelector('.popup__zoom-title');

export default class Card {
    constructor(data, cardSelector) {
        this._title = data.title;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate = () => {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__item')
            .cloneNode(true);
        return cardElement
    }

    generateCard = () => {
        const cardElement = this._getTemplate();
        this._addEventListener(cardElement);
        const linkCard = cardElement.querySelector('.elements__image');
        linkCard.src = this._link;
        linkCard.alt = this._title;
        const nameCard = cardElement.querySelector('.elements__title');
        nameCard.textContent = this._title;

        return cardElement
    }

    _removeCard = (event) => {
        event.currentTarget.closest('.elements__item').remove();
    }

    _likeCard = (event) => {
        event.currentTarget.classList.toggle('elements__like-button_active');
    }

    _openZoomPopup = (event) => {
        const titleCard = event.currentTarget.closest('.elements__item');
        popupZoomImage.src = event.currentTarget.src;
        popupZoomImage.alt = event.currentTarget.alt;
        popupZoomTitle.textContent = titleCard.querySelector('.elements__title').textContent;
        openPopup(popupZoom);
    }

    _addEventListener = (cardElement) => {
        const trashButton = cardElement.querySelector('.elements__trash');
        trashButton.addEventListener('click', this._removeCard);
        const likeButton = cardElement.querySelector('.elements__like-button');
        likeButton.addEventListener('click', this._likeCard);
        const linkCard = cardElement.querySelector('.elements__image');
        linkCard.addEventListener('click', this._openZoomPopup);
    }
}