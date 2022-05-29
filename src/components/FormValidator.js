export default class FormValidator {
    constructor(selectors, formElement) {
        this._selectors = selectors;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    }

    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    _setEventListeners = () => {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._updateInputErrors(inputElement);
                this.toggleButtonState();
            });
        });
    }

    _updateInputErrors = (inputElement) => {
        if (!this._isInputValid(inputElement)) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._selectors.inputErrorClass);
        errorElement.classList.remove(this._selectors.errorClass);
        errorElement.textContent = '';
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._selectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectors.errorClass);
    };

    toggleButtonState = () => {
        if (this._formElement.checkValidity()) {
            this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        } else {
            this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', 'disabled');
        }
    }

    _isInputValid = (inputElement) => {
        return inputElement.validity.valid
    }

    resetValidation() {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
           this._hideInputError(inputElement);
    });
 }
}