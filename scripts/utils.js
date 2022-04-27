import { closeByEsc } from './index.js'

function openPopup(popup) {
    document.addEventListener('keydown', closeByEsc);
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

export { openPopup, closePopup }