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
const popupProfileCloseButton = document.querySelector('.popup__close-button_profile');
const formElementProfile = document.querySelector('.popup__form_profile');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const popupPlace = document.querySelector('.popup_type_place');
const popupAddButton = document.querySelector('.profile__add-button');
const formElementPlace = document.querySelector('.popup__form_place');
const popupPlaceCloseButton = document.querySelector('.popup__close-button_place');
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

function formSubmitHandlerPlace(event) {
    event.preventDefault();
    const nameCardInput = placeInput.value;
    const linkCardInput = linkInput.value;
    renderCard(linkCardInput, nameCardInput);
    togglePlacePopup();
}




/* ------------------------------------------------------------------------------------ */
const cardsList = document.querySelector('.elements__list');

function renderCard(link, name) {
    const elementItem = document.querySelector('.card-template').content.firstElementChild.cloneNode(true);
    const linkCard = elementItem.querySelector('.elements__image');
    const nameCard = elementItem.querySelector('.elements__title');
    linkCard.src = link;
    linkCard.alt = name;
    nameCard.textContent = name;
    cardsList.prepend(elementItem);
    const trash = document.querySelectorAll('.elements__trash');

    trash.forEach(elem => {
        elem.addEventListener('click', removeCard);

    });

}

initialCards.map(function (item) {
    renderCard(item.link, item.name);
})



function removeCard(event) {
    const elementItem = event.currentTarget.closest('.elements__item');
    elementItem.remove();
}





/* ------------------------------------------------------------------------------------ */

popupEditButton.addEventListener('click', toggleProfilePopup);
popupProfileCloseButton.addEventListener('click', toggleProfilePopup);
formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

popupAddButton.addEventListener('click', togglePlacePopup);
popupPlaceCloseButton.addEventListener('click', togglePlacePopup);
formElementPlace.addEventListener('submit', formSubmitHandlerPlace);

//deleteCard.addEventListener('click', removeCard);

