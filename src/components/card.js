export default class Card {
    constructor(profileId, data, cardSelector, openZoomPopup, openRemovePopup, likeCardCallback, dislikeCardCallback) {
        this._profileId = profileId;
        this.id = data._id;
        this._title = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._cardSelector = cardSelector;
        this._openZoomPopup = openZoomPopup;
        this._openRemovePopup = openRemovePopup;
        this._likeButtonActiveClass = 'elements__like-button_active';
        this._likeCardCallback = likeCardCallback;
        this._dislikeCardCallback = dislikeCardCallback
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
        this._updateLikesView()

        if (this._profileId !== this._ownerId) {
            this._trashButton.classList.add('elements__trash_hidden');
        }

        return this._cardElement
    }

    setLikesInfo(data) {
        this._likes = data.likes;
        this._updateLikesView();
    }

    remove() {
        this._cardElement.remove();
    }

    _removeCard = (event) => {
        this._openRemovePopup(this);
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
            this._dislikeCardCallback(this)

        } else {
            this._likeCardCallback(this);
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

    _isLiked() {
        return Boolean(this._likes.find(item => item._id === this._profileId));
    }

    _updateLikesView() {
        this._likeCounterElement.textContent = this._likes.length;

        if (this._isLiked()) {
            this._likeButton.classList.add(this._likeButtonActiveClass);
        } else {
            this._likeButton.classList.remove(this._likeButtonActiveClass);
        }
    }
}