export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popup.addEventListener('click', (event) => {
            this._handleClosePopup(event)
        });
    }

    _handleClosePopup(event) {
        if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup')) {
            this.close();
        }
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
}