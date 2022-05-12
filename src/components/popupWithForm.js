import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitCallback = submitCallback;
        this._handleSubmitCallback = this._handleSubmitCallback.bind(this);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmitCallback);
    }

    _handleSubmitCallback(event) {
        event.preventDefault();
        this._submitCallback(this._getInputValues());
    }

    _getInputValues() {
        const values = {};
        this._popup.querySelectorAll('.popup__input').forEach((popupInput) => {
            values[popupInput.name] = popupInput.value;
        })
        return values
    }

    close() {
        super.close();
        this._form.reset();
    }

}