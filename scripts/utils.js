import {hideInputError, toggleButtonState} from "./formvalidation.js";

const popupProfile = document.querySelector('.popup_type_profile');
const formElementProfile = popupProfile.querySelector('.popup__form_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popupPlace = document.querySelector('.popup_type_place');

const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

function openPopup(popup) {
    document.addEventListener('keydown', closeByEsc);
    popup.classList.add('popup_opened');
}

function openProfilePopup(event) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    const formElement = popupProfile.querySelector(selectors.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement, selectors);
    })
    toggleButtonState(inputList, buttonElement, selectors);
    openPopup(popupProfile);
}

function openPlacePopup(event) {
    const formElement = popupPlace.querySelector(selectors.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, selectors);
    openPopup(popupPlace);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function handleClosePopup(event) {
    if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup') || event.type === 'submit') {
        closePopup(event.currentTarget.closest('.popup'));
    }
}

export { profileName, profileJob, nameInput, jobInput, formElementProfile, selectors, openPopup, openPlacePopup, openProfilePopup, handleClosePopup }