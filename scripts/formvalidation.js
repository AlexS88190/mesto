class FormValidationActivator {
    constructor(selectors, formElement) {
        this.selectors = selectors;
        this.formElement = formElement
    }

    enableValidation = () => {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    _setEventListeners = () => {
        const inputList = Array.from(this.formElement.querySelectorAll(this.selectors.inputSelector));
        const buttonElement = this.formElement.querySelector(this.selectors.submitButtonSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                updateInputErrors(this.formElement, inputElement, this.selectors);
                toggleButtonState(inputList, buttonElement, this.selectors);
            });
        });
    }
}

const updateInputErrors = (formElement, inputElement, selectors) => {
    if (!isInputValid(inputElement)) {
        showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
    } else {
        hideInputError(formElement, inputElement, selectors);
    }
}

const hideInputError = (formElement, inputElement, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
}

const showInputError = (formElement, inputElement, errorMessage, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
};

const toggleButtonState = (inputList, buttonElement, selectors) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(selectors.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(selectors.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

const isInputValid = (inputElement) => {
    return inputElement.validity.valid
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !isInputValid(inputElement);
    });
}

const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        const formValidationActivator = new FormValidationActivator(selectors, formElement);
        formValidationActivator.enableValidation();
    });
}

export { FormValidationActivator, updateInputErrors, hideInputError, showInputError, toggleButtonState, isInputValid, hasInvalidInput, enableValidation }