export default class UserInfo {
    constructor(profileTitleSelector, profileSubTitleSelector) {
        this._profileTitleElement = document.querySelector(profileTitleSelector);
        this._profileSubTitleElement = document.querySelector(profileSubTitleSelector);
    }
    getUserInfo = () => {
        return {
            profileTitle: this._profileTitleElement.textContent,
            profileSubTitle: this._profileSubTitleElement.textContent
        }
    }

    setUserInfo = (profileTitle, profileSubTitle) => {
        this._profileTitleElement.textContent = profileTitle;
        this._profileSubTitleElement.textContent = profileSubTitle;
    }
}