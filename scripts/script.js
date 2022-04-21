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
const popupList = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_type_profile');
const popupEditButton = document.querySelector('.profile__edit-button');
const formElementProfile = popupProfile.querySelector('.popup__form_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const popupPlace = document.querySelector('.popup_type_place');
const popupAddButton = document.querySelector('.profile__add-button');
const formElementPlace = popupPlace.querySelector('.popup__form_place');
const placeInput = formElementPlace.querySelector('.popup__input_type_place');
const linkInput = formElementPlace.querySelector('.popup__input_type_link');

const popupZoom = document.querySelector('.popup_type_zoom');
const popupZoomImage = popupZoom.querySelector('.popup__image');
const popupZoomTitle = popupZoom.querySelector('.popup__zoom-title');

const cardsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card-template');

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

function openZoomPopup(event) {
    const titleCard = event.currentTarget.closest('.elements__item');
    popupZoomImage.src = event.currentTarget.src;
    popupZoomImage.alt = event.currentTarget.alt
    popupZoomTitle.textContent = titleCard.querySelector('.elements__title').textContent;
    openPopup(popupZoom);
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

function handleProfileFormSubmit (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    handleClosePopup(event);
}

function handlePlaceFormSubmit(event) {
    event.preventDefault();
    const nameCardInput = placeInput.value;
    const linkCardInput = linkInput.value;
    renderCard(linkCardInput, nameCardInput);
    handleClosePopup(event);
    formElementPlace.reset();
}

function removeCard(event) {
    event.currentTarget.closest('.elements__item').remove();
}

function likeCard(event) {
    event.currentTarget.classList.toggle('elements__like-button_active');
}

function createCard(link, name) {
    const elementItem = cardTemplate.content.firstElementChild.cloneNode(true);

    const linkCard = elementItem.querySelector('.elements__image');
    linkCard.src = link;
    linkCard.alt = name;
    const nameCard = elementItem.querySelector('.elements__title');
    nameCard.textContent = name;

    const trashElements = elementItem.querySelector('.elements__trash');
    trashElements.addEventListener('click', removeCard);
    const likeElements = elementItem.querySelector('.elements__like-button');
    likeElements.addEventListener('click', likeCard);
    const zoomElements = elementItem.querySelector('.elements__image');
    zoomElements.addEventListener('click', openZoomPopup);

    return elementItem;
}

function renderCard(link, name) {
    cardsList.prepend(createCard(link, name));
}

initialCards.map(function (item) {
    renderCard(item.link, item.name);
});

popupEditButton.addEventListener('click', openProfilePopup);
formElementProfile.addEventListener('submit', handleProfileFormSubmit);

popupAddButton.addEventListener('click', openPlacePopup);
formElementPlace.addEventListener('submit', handlePlaceFormSubmit);

popupList.forEach(popup => {
    popup.addEventListener('click', handleClosePopup);
});

enableValidation(selectors);

