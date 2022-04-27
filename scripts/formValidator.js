export default class FormValidator {
    constructor(selectors, formElement) {
        this.selectors = selectors;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.selectors.inputSelector));
        this.buttonElement = this.formElement.querySelector(this.selectors.submitButtonSelector);
    }

    enableValidation = () => {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    _setEventListeners = () => {
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._updateInputErrors(inputElement);
                this._toggleButtonState();
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
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.selectors.inputErrorClass);
        errorElement.classList.remove(this.selectors.errorClass);
        errorElement.textContent = '';
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.selectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.selectors.errorClass);
    };

    _toggleButtonState = () => {
        if (this._hasInvalidInput(this.inputList)) {
            this.buttonElement.classList.add(this.selectors.inactiveButtonClass);
            this.buttonElement.setAttribute('disabled', 'disabled');
        } else {
            this.buttonElement.classList.remove(this.selectors.inactiveButtonClass);
            this.buttonElement.removeAttribute('disabled');
        }
    }

    _isInputValid = (inputElement) => {
        return inputElement.validity.valid
    }

    _hasInvalidInput = () => {
        return this.inputList.some((inputElement) => {
            return !this._isInputValid(inputElement);
        });
    }
}