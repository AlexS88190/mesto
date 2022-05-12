import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupZoomImage = this._popup.querySelector('.popup__image');
        this._popupZoomTitle = this._popup.querySelector('.popup__zoom-title');
    }
    open(text, link) {
        super.open();
        this._popupZoomImage.src = link;
        this._popupZoomImage.alt = text;
        this._popupZoomTitle.textContent = text;
    }
}