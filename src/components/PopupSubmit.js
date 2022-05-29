import Popup from "./Popup.js";

export default class PopupSubmit extends Popup {
    constructor(popupSelector, submitCallback, popupButtonTexts) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitCallback = submitCallback;
        this._popupButtonTexts = popupButtonTexts;
        this._popupButton = this._form.querySelector('.popup__save-button');
        this._handleSubmitCallback = this._handleSubmitCallback.bind(this);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmitCallback);
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._popupButton.textContent = this._popupButtonTexts.loading;
            this._popupButton.setAttribute('disabled', 'disabled');
        } else {
            this._popupButton.textContent = this._popupButtonTexts.loaded;
            this._popupButton.removeAttribute('disabled');
        }
    }

    setSubmitAction(action) {
        this._submitCallback = action;
    }

    _handleSubmitCallback(event) {
        event.preventDefault();
        this._submitCallback();
        this.renderLoading(true);
    }
}