const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupProfile = document.querySelector('.popup_type_profile');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button_profile');
const formElementProfile = document.querySelector('.popup__form_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');


const popupPlace = document.querySelector('.popup_type_place');
const popupAddButton = document.querySelector('.profile__add-button');
const formElementPlace = document.querySelector('.popup__form_place');
const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button_place');
const placeInput = formElementPlace.querySelector('.popup__input_type_place');
const linkInput = formElementPlace.querySelector('.popup__input_type_link');



function toggleProfilePopup(event) {
    if (!popupProfile.classList.contains('popup_opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
    }
    popupProfile.classList.toggle('popup_opened');
}

function formSubmitHandlerProfile (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    toggleProfilePopup();
}

function togglePlacePopup(event) {
    if (!popupPlace.classList.contains('popup_opened')) {
        placeInput.value = '';
        linkInput.value = '';
    }
    popupPlace.classList.toggle('popup_opened');
}




const popupZoom = document.querySelector('.popup_type_zoom');
const popupZoomCloseButton = popupZoom.querySelector('.popup__close-button_zoom');
const popupZoomImage = popupZoom.querySelector('.popup__image');
const popupZoomTitle = popupZoom.querySelector('.popup__zoom-title');


function toggleZoomPopup(event) {
    if (!popupZoom.classList.contains('popup_opened')) {
        popupZoomImage.src = event.currentTarget.src;
        popupZoomTitle.textContent = event.currentTarget.alt;
    }
    popupZoom.classList.toggle('popup_opened');
}








function formSubmitHandlerPlace(event) {
    event.preventDefault();
    const nameCardInput = placeInput.value;
    const linkCardInput = linkInput.value;
    renderCard(linkCardInput, nameCardInput);
    togglePlacePopup();
}


const cardsList = document.querySelector('.elements__list');

function renderCard(link, name) {
    const elementItem = document.querySelector('.card-template').content.firstElementChild.cloneNode(true);
    const linkCard = elementItem.querySelector('.elements__image');
    const nameCard = elementItem.querySelector('.elements__title');

    linkCard.src = link;
    linkCard.alt = name;
    nameCard.textContent = name;
    cardsList.prepend(elementItem);

    const trashElements = document.querySelectorAll('.elements__trash');
    trashElements.forEach(elem => {
        elem.addEventListener('click', removeCard);
    });

    const likeElements = document.querySelectorAll('.elements__like-button');
    likeElements.forEach(elem => {
        elem.addEventListener('click', likeCard);
    });

    const zoomElements = document.querySelectorAll('.elements__image');
    zoomElements.forEach(elem => {
        elem.addEventListener('click', toggleZoomPopup);
    })

}


initialCards.map(function (item) {
    renderCard(item.link, item.name);
})


function removeCard(event) {
    event.currentTarget.closest('.elements__item').remove();
}

function likeCard(event) {
    event.currentTarget.classList.toggle('elements__like-button_active');
}




popupEditButton.addEventListener('click', toggleProfilePopup);
popupProfileCloseButton.addEventListener('click', toggleProfilePopup);
formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

popupAddButton.addEventListener('click', togglePlacePopup);
popupPlaceCloseButton.addEventListener('click', togglePlacePopup);
formElementPlace.addEventListener('submit', formSubmitHandlerPlace);

popupZoomCloseButton.addEventListener('click', toggleZoomPopup);

