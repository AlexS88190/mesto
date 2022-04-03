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

const closeButtonList = document.querySelectorAll('.popup__close-button');
const cardsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.card-template');


/* Закрытие попапа не сделал так как вы рекомендовали, потому что еще не совсем разобрался как ваш код работает, точнее как он работает
я понимаю, но "понимать" и "догадаться как реализовать" это совершенно разные вещи. Поэтому сделал немного по-другому. Ваше решение
красивое, обязательно возьму на заметку, большое спасибо! */

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function openProfilePopup(event) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupProfile);
}

function openPlacePopup(event) {
    formElementPlace.reset();
    openPopup(popupPlace);
}

function openZoomPopup(event) {
    const titleCard = event.currentTarget.closest('.elements__item');
    popupZoomImage.src = event.currentTarget.src;
    popupZoomTitle.textContent = titleCard.querySelector('.elements__title').textContent;
    openPopup(popupZoom);
}

function closePopup(event) {
    event.currentTarget.closest('.popup').classList.remove('popup_opened');
}

function handleProfileFormSubmit (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(event);
}

function handlePlaceFormSubmit(event) {
    event.preventDefault();
    const nameCardInput = placeInput.value;
    const linkCardInput = linkInput.value;
    renderCard(linkCardInput, nameCardInput);
    closePopup(event);
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

closeButtonList.forEach(closeButton => {
    closeButton.addEventListener('click', closePopup)
})
