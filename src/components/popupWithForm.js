import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback, popupButtonTexts) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._popupButton = this._form.querySelector('.popup__save-button');
        this._submitCallback = submitCallback;
        this._popupButtonTexts = popupButtonTexts;
        this._handleSubmitCallback = this._handleSubmitCallback.bind(this);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmitCallback);
    }

    close() {
        super.close();
        this._form.reset();
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

    _handleSubmitCallback(event) {
        event.preventDefault();
        this._submitCallback(this._getInputValues());
        this.renderLoading(true);
    }

    _getInputValues() {
        const values = {};
        this._popup.querySelectorAll('.popup__input').forEach((popupInput) => {
            values[popupInput.name] = popupInput.value;
        })
        return values
    }


}