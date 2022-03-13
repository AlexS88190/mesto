const popup = document.querySelector(".popup");
const openPopup = document.querySelector(".profile__edit-button");
const closePopup = popup.querySelector(".popup__close");

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__form-name");
const jobInput = formElement.querySelector(".popup__form-about");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

function togglePopup(event) {
    popup.classList.toggle("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopupArea(event) {
    if (event.target === event.currentTarget) {
        togglePopup();
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup();
}

popup.addEventListener("click", closePopupArea);
openPopup.addEventListener("click", togglePopup);
closePopup.addEventListener("click", togglePopup);
formElement.addEventListener("submit", formSubmitHandler);