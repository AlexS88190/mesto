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
} from '../utils/constants.js'
import './index.css';
import Card from '../components/Card.js';

import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupSubmit from "../components/PopupSubmit.js";
import Api from "../components/API.js";

const initialCards = [];
let profileInfo = {};
const section = new Section({ items: initialCards, renderer: createCard }, '.elements__list');
const userInfo = new UserInfo({ profileTitleSelector: '.profile__title', profileSubTitleSelector: '.profile__subtitle', profileAvatarSelector: '.profile__avatar' });
const popupWithImage = new PopupWithImage('.popup_type_zoom');
popupWithImage.setEventListeners();
const popupPlace = new PopupWithForm('.popup_type_place', submitPlaceForm, { loading: creationText, loaded: createText });
popupPlace.setEventListeners();
const popupProfile = new PopupWithForm('.popup_type_profile', submitProfileForm, { loading: savingText, loaded: saveText });
popupProfile.setEventListeners();
const popupEditAvatar = new PopupWithForm('.popup_type_update', submitEditAvatar, { loading: savingText, loaded: saveText });
popupEditAvatar.setEventListeners();
const popupRemoveCard = new PopupSubmit('.popup_type_remove', submitCardRemove, { loading: removingText, loaded: yesText });
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

function openEditAvatar() {
    formEditAvatarValidator.toggleButtonState();
    popupEditAvatar.open();
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

    const card = new Card({
        profileId: profileInfo._id,
        data: data,
        cardSelector: cardSelector,
        openZoomPopup: (text, link) => {
            popupWithImage.open(text, link)
        },
        removeButtonClickCallback: (card) => {
            popupRemoveCard.setSubmitAction(() => {
                submitCardRemove(card)
            })
            popupRemoveCard.open();
        },
        likeCardCallback: (card) => {
            api.like(card.id).then((data) => {
                card.setLikesInfo(data);
            }).catch(error => console.log(error));
        },
        dislikeCardCallback: (card) => {
            api.dislike(card.id).then((data) => {
                card.setLikesInfo(data);
            }).catch(error => console.log(error));
        }
    });

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
            popupProfile.renderLoading(false);
        })
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
            popupPlace.renderLoading(false);
    })
}

function submitEditAvatar(popupData) {
    api.updateAvatar(popupData.link).then(() => {
        userInfo.setAvatar(popupData.link);
        popupEditAvatar.close()
    }).catch(error => console.log(error))
        .finally(() => {
            popupEditAvatar.renderLoading(false);
        })
}

function submitCardRemove(card) {
    api.deleteCard(card.id).then((res) => {
        card.remove();
        popupRemoveCard.close();
    }).catch(error => console.log(error))
        .finally(() => {
            popupRemoveCard.renderLoading(false);
        })
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