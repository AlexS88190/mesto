import Card from './card.js'

import {
    openPopup,
    closePopup
} from './utils.js'

import FormValidator from "./formValidator.js";

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
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const formElementProfile = popupProfile.querySelector('.popup__form_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElementPlace = popupPlace.querySelector('.popup__form_place');
const popupZoom = document.querySelector('.popup_type_zoom');
const popupZoomImage = popupZoom.querySelector('.popup__image');
const popupZoomTitle = popupZoom.querySelector('.popup__zoom-title');

const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const cardsList = document.querySelector('.elements__list');
const placeInput = formElementPlace.querySelector('.popup__input_type_place');
const linkInput = formElementPlace.querySelector('.popup__input_type_link');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupList = document.querySelectorAll('.popup');

function openProfilePopup(event) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    formProfileValidator.resetValidation();
    openPopup(popupProfile);
}

function openPlacePopup(event) {
    formPlaceValidator.toggleButtonState();
    openPopup(popupPlace);
}

function openZoomPopup(text, link) {
    popupZoomImage.src = link;
    popupZoomImage.alt = text;
    popupZoomTitle.textContent = text;
    openPopup(popupZoom);
}

function handleClosePopup(event) {
    if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup')) {
        closePopup(event.currentTarget);
    }
}

function enableValidation() {
    formProfileValidator.enableValidation();
    formPlaceValidator.enableValidation();
}

const formProfileValidator = new FormValidator(selectors, formElementProfile);
const formPlaceValidator = new FormValidator(selectors, formElementPlace);

function createCard(link, name) {
    const data = {title: name, link: link}
    const cardSelector = '.card-template';
    const card = new Card(data, cardSelector, openZoomPopup);
    const generatedCard = card.generateCard();

    return generatedCard
}

function renderCard(link, name) {
    const createdCard = createCard(link, name)
    cardsList.prepend(createdCard);
}

function handleProfileFormSubmit (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);

}

function handlePlaceFormSubmit(event) {
    event.preventDefault();
    const nameCardInput = placeInput.value;
    const linkCardInput = linkInput.value;
    renderCard(linkCardInput, nameCardInput);
    closePopup(popupPlace);
    formElementPlace.reset();
}

function setListeners() {
    popupEditButton.addEventListener('click', openProfilePopup);
    formElementProfile.addEventListener('submit', handleProfileFormSubmit);

    popupAddButton.addEventListener('click', openPlacePopup);
    formElementPlace.addEventListener('submit', handlePlaceFormSubmit);

    popupList.forEach(popup => {
        popup.addEventListener('click', handleClosePopup);
    });
}

function main() {
    initialCards.map(function (item) {
        renderCard(item.link, item.name);
    });
    setListeners();
    enableValidation();
}

main();