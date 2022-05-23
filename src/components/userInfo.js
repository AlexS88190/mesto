export default class UserInfo {
    constructor({ profileTitleSelector, profileSubTitleSelector,  profileAvatarSelector}) {
        this._profileTitleElement = document.querySelector(profileTitleSelector);
        this._profileSubTitleElement = document.querySelector(profileSubTitleSelector);
        this._avatarElement = document.querySelector(profileAvatarSelector);
    }
    getUserInfo = () => {
        return {
            profileTitle: this._profileTitleElement.textContent,
            profileSubTitle: this._profileSubTitleElement.textContent
        }
    }

    setUserInfo = ({ profileTitle, profileSubTitle }) => {
        this._profileTitleElement.textContent = profileTitle;
        this._profileSubTitleElement.textContent = profileSubTitle;
    }

    setAvatar = (link) => {
        this._avatarElement.style.backgroundImage = `url(${link})`
    }
}