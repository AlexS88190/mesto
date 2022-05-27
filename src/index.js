import './pages/index.css';
import Card from './components/card.js';

import FormValidator from "./components/formValidator.js";
import Section from "./components/section.js";
import UserInfo from "./components/userInfo.js";
import PopupWithImage from "./components/popupWithImage.js";
import PopupWithForm from "./components/popupWithForm.js";
import Api from "./utils/API.js";

const initialCards = [];
let profileInfo = {};
const section = new Section({ items: initialCards, renderer: createCard }, '.elements__list');
const userInfo = new UserInfo({ profileTitleSelector: '.profile__title', profileSubTitleSelector: '.profile__subtitle', profileAvatarSelector: '.profile__avatar' });
const popupWithImage = new PopupWithImage('.popup_type_zoom');
popupWithImage.setEventListeners();
const popupPlace = new PopupWithForm('.popup_type_place', submitPlaceForm);
popupPlace.setEventListeners();
const popupProfile = new PopupWithForm('.popup_type_profile', submitProfileForm);
popupProfile.setEventListeners();
const popupEditAvatar = new PopupWithForm('.popup_type_update', submitEditAvatar);
popupEditAvatar.setEventListeners();
const popupRemoveCard = new PopupWithForm('.popup_type_remove');
popupRemoveCard.setEventListeners();
const api = new Api('cohort-41', 'c5ad47cd-94e1-4e0d-ba61-6865eeedf90c', 'https://mesto.nomoreparties.co/v1');

const popupProfileElement = document.querySelector('.popup_type_profile');
const popupPlaceElement = document.querySelector('.popup_type_place');
const popupEditAvatarElement = document.querySelector('.popup_type_update');
const formElementProfile = popupProfileElement.querySelector('.popup__form_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_about');
const formElementPlace = popupPlaceElement.querySelector('.popup__form_place');
const formElementEditAvatar = popupEditAvatarElement.querySelector('.popup__form_update');

const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupEditAvatarButton = document.querySelector('.profile__avatar-button');

function openProfilePopup(event) {
    const userInfoData = userInfo.getUserInfo();
    nameInput.value = userInfoData.profileTitle;
    jobInput.value = userInfoData.profileSubTitle;

    formProfileValidator.resetValidation();
    popupProfile.open();
}

function openPlacePopup(event) {
    formPlaceValidator.toggleButtonState();
    popupPlace.open();
}

function openZoomPopup(text, link) {
    popupWithImage.open(text, link)
}

function openEditAvatar() {
    formEditAvatarValidator.toggleButtonState();
    popupEditAvatar.open();
}

function openRemovePopup(submitCallback) {
    popupRemoveCard.setSubmitCallBack(() => {
        submitCallback().then(() => {
            popupRemoveCard.close();
        })
    });
    popupRemoveCard.open();
}

function enableValidation() {
    formProfileValidator.enableValidation();
    formPlaceValidator.enableValidation();
    formEditAvatarValidator.enableValidation()
}

const formProfileValidator = new FormValidator(selectors, formElementProfile);
const formPlaceValidator = new FormValidator(selectors, formElementPlace);
const formEditAvatarValidator = new FormValidator(selectors, formElementEditAvatar);

function createCard(data) {
    const cardSelector = '.card-template';
    const card = new Card(api, profileInfo._id, data, cardSelector, openZoomPopup, openRemovePopup);
    const generatedCard = card.generateCard();

    return generatedCard
}

function renderCard(data) {
    const createdCard = createCard(data);
    section.addItem(createdCard);
}

function submitProfileForm (popupData) {
    api.updateProfileInfo(popupData.name_profile, popupData.about_profile).then(() => {
        userInfo.setUserInfo({ profileTitle: popupData.name_profile, profileSubTitle: popupData.about_profile });
    })
    popupProfile.close();
}

function submitPlaceForm(popupData) {
    const nameCardInput = popupData.place;
    const linkCardInput = popupData.link;
    api.addCard(nameCardInput, linkCardInput).then((res) => {
        renderCard(res);
        popupPlace.close();
    })
}

function submitEditAvatar(popupData) {
    api.updateAvatar(popupData.link).then(() => {
        userInfo.setAvatar(popupData.link);
    })
    popupEditAvatar.close()
}

function setListeners() {
    popupEditButton.addEventListener('click', openProfilePopup);
    popupAddButton.addEventListener('click', openPlacePopup);
    popupEditAvatarButton.addEventListener('click', openEditAvatar);
}

function updateProfileInfo() {
    return api.getProfileInfo().then(res => {
        userInfo.setUserInfo({ profileTitle: res.name, profileSubTitle: res.about })
        userInfo.setAvatar(res.avatar);
        return res
    });
}

function updateCards() {
    api.getCards().then((res) => {
        console.log(res);
        section.setItems(res);
        section.renderItems();
    })
}

function main() {
    updateProfileInfo()
        .then((res) => {
            profileInfo = res;
            updateCards();
            setListeners();
            enableValidation();
        })
}

main();