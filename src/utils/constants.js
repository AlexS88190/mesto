export const popupProfileElement = document.querySelector('.popup_type_profile');
export const popupPlaceElement = document.querySelector('.popup_type_place');
export const popupEditAvatarElement = document.querySelector('.popup_type_update');
export const popupRemoveCard = document.querySelector('.popup_type_remove');
export const formElementProfile = popupProfileElement.querySelector('.popup__form_profile');
export const nameInput = formElementProfile.querySelector('.popup__input_type_name');
export const jobInput = formElementProfile.querySelector('.popup__input_type_about');
export const formElementPlace = popupPlaceElement.querySelector('.popup__form_place');
export const formElementEditAvatar = popupEditAvatarElement.querySelector('.popup__form_update');

export const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

export const popupEditButton = document.querySelector('.profile__edit-button');
export const popupAddButton = document.querySelector('.profile__add-button');
export const popupEditAvatarButton = document.querySelector('.profile__avatar-button');
export const saveProfileButton = popupProfileElement.querySelector('.popup__save-button');
export const addCardButton = popupPlaceElement.querySelector('.popup__save-button');
export const saveAvatarButton = popupEditAvatarElement.querySelector('.popup__save-button');
export const removeCardButton = popupRemoveCard.querySelector('.popup__save-button');


export const saveText = 'Сохранить';
export const savingText = 'Сохранение...';
export const createText = 'Создать';
export const creationText = 'Создание...';
export const yesText = 'Да';
export const removingText = 'Удаление...';