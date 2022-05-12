import './pages/index.css';
import Card from './components/card.js';

import FormValidator from "./components/formValidator.js";
import Section from "./components/section.js";
import UserInfo from "./components/userInfo.js";
import PopupWithImage from "./components/popupWithImage.js";
import PopupWithForm from "./components/popupWithForm.js";

const initialCards = [
    {
        name: 'Palm Jumeirah, Dubai',
        link: 'https://lilastourism.com/wp-content/uploads/2017/11/skydive-dubai1.jpg'
    },
    {
        name: 'Waialua, Hawaii',
        link: 'https://live.staticflickr.com/5131/5447473435_2567ba3776_b.jpg'
    },
    {
        name: 'Interlaken, Switzerland',
        link: 'https://cantina-caverna.ch/wp-content/uploads/2017/08/visit_interlaken_lungern_view.jpg'
    },
    {
        name: 'Majlis al Jinn, Oman',
        link: 'https://www.getlostmagazine.com/wp-content/uploads/2016/05/GL35-OMAN-SS-JINN_CAVE-1500x900.jpg'
    },
    {
        name: 'Stratosphere',
        link: 'https://avatars.mds.yandex.net/get-zen_doc/1900011/pub_5dd9914ca4655250ff59d1c3_5debb1325d636200ad8366c6/scale_1200'
    },
    {
        name: 'Chamonix, Switzerland',
        link: 'https://www.orangesmile.com/common/img_cities_original/chamonix-mont-blanc--1418045-2.jpg'
    }
];
const section = new Section({ items: initialCards, renderer: createCard }, '.elements__list');
const userInfo = new UserInfo({ profileTitleSelector: '.profile__title', profileSubTitleSelector: '.profile__subtitle' });
const popupWithImage = new PopupWithImage('.popup_type_zoom');
popupWithImage.setEventListeners();
const popupPlace = new PopupWithForm('.popup_type_place', submitPlaceForm);
popupPlace.setEventListeners();
const popupProfile = new PopupWithForm('.popup_type_profile', submitProfileForm);
popupProfile.setEventListeners();

const popupProfileElement = document.querySelector('.popup_type_profile');
const popupPlaceElement = document.querySelector('.popup_type_place');
const formElementProfile = popupProfileElement.querySelector('.popup__form_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_about');
const formElementPlace = popupPlaceElement.querySelector('.popup__form_place');

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

function enableValidation() {
    formProfileValidator.enableValidation();
    formPlaceValidator.enableValidation();
}

const formProfileValidator = new FormValidator(selectors, formElementProfile);
const formPlaceValidator = new FormValidator(selectors, formElementPlace);

function createCard(data) {
    const cardSelector = '.card-template';
    const card = new Card(data, cardSelector, openZoomPopup);
    const generatedCard = card.generateCard();

    return generatedCard
}

function renderCard(link, name) {
    const createdCard = createCard({ name: name, link: link });
    section.addItem(createdCard);
}

function submitProfileForm (popupData) {
    userInfo.setUserInfo({ profileTitle: popupData.name_profile, profileSubTitle: popupData.about_profile });
    popupProfile.close();
}

function submitPlaceForm(popupData) {
    const nameCardInput = popupData.place;
    const linkCardInput = popupData.link;
    renderCard(linkCardInput, nameCardInput);
    popupPlace.close();

}

function setListeners() {
    popupEditButton.addEventListener('click', openProfilePopup);
    popupAddButton.addEventListener('click', openPlacePopup);
}

function main() {
    section.renderItems();
    setListeners();
    enableValidation();
}

main();