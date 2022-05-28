import {
    formElementProfile,
    nameInput,
    jobInput,
    formElementPlace,
    formElementEditAvatar,
    selectors,
    popupEditButton,
    popupAddButton,
    popupEditAvatarButton,
    saveProfileButton,
    addCardButton,
    saveAvatarButton,
    removeCardButton,
    saveText,
    savingText,
    createText,
    creationText,
    yesText,
    removingText
} from './utils/constants.js'
import './pages/index.css';
import Card from './components/card.js';

import FormValidator from "./components/formValidator.js";
import Section from "./components/section.js";
import UserInfo from "./components/userInfo.js";
import PopupWithImage from "./components/popupWithImage.js";
import PopupWithForm from "./components/popupWithForm.js";
import PopupSubmit from "./components/popupSubmit.js";
import Api from "./components/API.js";

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
const popupRemoveCard = new PopupSubmit('.popup_type_remove', submitCardRemove);
popupRemoveCard.setEventListeners();
const api = new Api('cohort-41', 'c5ad47cd-94e1-4e0d-ba61-6865eeedf90c', 'https://mesto.nomoreparties.co/v1');

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

function openRemovePopup(card) {
    popupRemoveCard.open(card);
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
    const card = new Card(profileInfo._id, data, cardSelector, openZoomPopup, openRemovePopup, handleLikeCard, handleDislikeCard);
    const generatedCard = card.generateCard();

    return generatedCard
}

function renderCard(data) {
    const createdCard = createCard(data);
    section.addItem(createdCard);
}

function submitProfileForm (popupData) {
    api.updateProfileInfo(popupData.name_profile, popupData.about_profile)
        .then(() => {
            userInfo.setUserInfo({ profileTitle: popupData.name_profile, profileSubTitle: popupData.about_profile });
            popupProfile.close();
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            saveProfileButton.textContent = saveText;
            saveProfileButton.removeAttribute('disabled');
        })

    saveProfileButton.textContent = savingText;
    saveProfileButton.setAttribute('disabled', 'disabled');
}

function submitPlaceForm(popupData) {
    const nameCardInput = popupData.place;
    const linkCardInput = popupData.link;
    api.addCard(nameCardInput, linkCardInput)
        .then((res) => {
        renderCard(res);
        popupPlace.close();
    })
        .catch(error => console.log(error))
        .finally(() => {
            addCardButton.textContent = createText;
            addCardButton.removeAttribute('disabled');
    })
    addCardButton.textContent = creationText;
    addCardButton.setAttribute('disabled', 'disabled');
}

function submitEditAvatar(popupData) {
    api.updateAvatar(popupData.link).then(() => {
        userInfo.setAvatar(popupData.link);
        popupEditAvatar.close()
    }).catch(error => console.log(error))
        .finally(() => {
            saveAvatarButton.textContent = saveText;
            saveAvatarButton.removeAttribute('disabled');
        })
    saveAvatarButton.textContent = savingText;
    saveAvatarButton.setAttribute('disabled', 'disabled');
}

function submitCardRemove(card) {
    api.deleteCard(card.id).then((res) => {
        card.remove();
        popupRemoveCard.close();
    }).catch(error => console.log(error))
        .finally(() => {
            removeCardButton.textContent = yesText;
            removeCardButton.removeAttribute('disabled');
        })
    removeCardButton.textContent = removingText;
    removeCardButton.setAttribute('disabled', 'disabled');
}

function handleLikeCard(card) {
    api.like(card.id).then((data) => {
        card.setLikesInfo(data);
    }).catch(error => console.log(error));
}

function handleDislikeCard(card) {
    api.dislike(card.id).then((data) => {
        card.setLikesInfo(data);
    }).catch(error => console.log(error));
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
    return api.getCards().then((res) => {
        section.setItems(res);
    })
}

function main() {
    Promise.all([updateProfileInfo(), updateCards()])
        .then((res) => {
            profileInfo = res[0];
            section.renderItems();
            setListeners();
            enableValidation();
        }).catch(error => console.log(error));
}

main();