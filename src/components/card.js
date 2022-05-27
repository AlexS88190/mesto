export default class Card {
    constructor(api, profileId, data, cardSelector, openZoomPopup, openRemovePopup) {
        this._api = api;
        this._profileId = profileId;
        this._id = data._id;
        this._title = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._likeCounter = data.likes.length;
        this._ownerId = data.owner._id;
        this._cardSelector = cardSelector;
        this._openZoomPopup = openZoomPopup;
        this._openRemovePopup = openRemovePopup;
        this._likeButtonActiveClass = 'elements__like-button_active'
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
        this._likeCounterElement.textContent = this._likeCounter;

        if (this._likes.find(item => item._id === this._profileId)) {
            this._likeButton.classList.add('elements__like-button_active');
        }
        if (this._profileId !== this._ownerId) {
            this._trashButton.remove();
        }

        return this._cardElement
    }

    _removeCard = (event) => {
        this._openRemovePopup(() => {
            return this._api.deleteCard(this._id).then((res) => {
                this._cardElement.remove();
                this._destroyElements();
            })
        })
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
        this._likeCounterElement = this._cardElement.querySelector('.elements__like-counter');
    }

    _likeCard = (event) => {
        if (this._likeButton.classList.contains(this._likeButtonActiveClass)) {
            this._api.dislike(this._id)
                .then((res) => {
                    this._likeButton.classList.remove(this._likeButtonActiveClass);
                    this._likeCounter = this._likeCounter - 1;
                    this._likeCounterElement.textContent = this._likeCounter;
                })

        } else {
            this._api.like(this._id)
                .then((res) => {
                    this._likeButton.classList.add(this._likeButtonActiveClass);
                    this._likeCounter = this._likeCounter + 1;
                    this._likeCounterElement.textContent = this._likeCounter;
                })
        }

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