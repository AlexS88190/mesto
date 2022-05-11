export default class Card {
    constructor(data, cardSelector, openZoomPopup) {
        this._title = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._openZoomPopup = openZoomPopup;
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
        this._initElements();
        this._addEventListener();
        this._linkCard.src = this._link;
        this._linkCard.alt = this._title;
        this._nameCard.textContent = this._title;

        return this._cardElement
    }

    _removeCard = (event) => {
        this._cardElement.remove();
        this._destroyElements();
    }

    _destroyElements = () => {
        this._trashButton = null;
        this._cardElement = null;
        this._likeButton = null;
        this._nameCard = null;
        this._linkCard = null;
    }

    _initElements = () => {
        this._cardElement = this._getTemplate();
        this._linkCard = this._cardElement.querySelector('.elements__image');
        this._nameCard = this._cardElement.querySelector('.elements__title');
        this._trashButton = this._cardElement.querySelector('.elements__trash');
        this._likeButton = this._cardElement.querySelector('.elements__like-button');
    }


    _likeCard = (event) => {
        this._likeButton.classList.toggle('elements__like-button_active');
    }

    _handleOpenZoomPopup = (event) => {
        this._openZoomPopup(this._title, this._link);
    }

    _addEventListener = () => {
        this._trashButton.addEventListener('click', this._removeCard);
        this._likeButton.addEventListener('click', this._likeCard);
        this._linkCard.addEventListener('click', this._handleOpenZoomPopup);
    }
}