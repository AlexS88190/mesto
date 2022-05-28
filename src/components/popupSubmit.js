import Popup from "./popup.js";

export default class PopupSubmit extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitCallback = submitCallback;
        this._handleSubmitCallback = this._handleSubmitCallback.bind(this);
    }

    open(card) {
        super.open();
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmitCallback);
    }

    _handleSubmitCallback(event) {
        event.preventDefault();
        this._submitCallback(this._card);
    }
}