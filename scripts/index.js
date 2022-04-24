import Card from './card.js'
import { profileName, profileJob, nameInput, jobInput, formElementProfile, selectors, openProfilePopup, openPlacePopup, handleClosePopup } from './utils.js'
import { enableValidation } from './formvalidation.js'

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
const cardsList = document.querySelector('.elements__list');
const formElementPlace = document.querySelector('.popup__form_place');
const placeInput = formElementPlace.querySelector('.popup__input_type_place');
const linkInput = formElementPlace.querySelector('.popup__input_type_link');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupList = document.querySelectorAll('.popup');

function renderCard(link, name) {
    const data = {title: name, link: link}
    const cardSelector = '.card-template';
    const card = new Card(data, cardSelector);
    const generatedCard = card.generateCard();
    cardsList.prepend(generatedCard);
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
    enableValidation(selectors);
}

main();

