export default class Api {
    constructor(cohortId, authorizationToken, baseUrl) {
        this._headers = {
            authorization: authorizationToken,
            'Content-Type': 'application/json'
        }
        this._baseUrl = `${baseUrl}/${cohortId}`
    }
    getProfileInfo = () => {
        return this._addHandlers(fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }));
    }

    updateProfileInfo = (name, about) => {
        return this._addHandlers(fetch( `${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }));
    }

    updateAvatar = (link) => {
        return this._addHandlers(fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }));
    }

    getCards = () => {
        return this._addHandlers(fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }));
    }

    addCard = (name, link) => {
        return this._addHandlers(fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }));
    }

    like = (cardId) => {
        console.log(cardId)
        return this._addHandlers(fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        }));
    }

    dislike = (cardId) => {
        return this._addHandlers(fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }));
    }

    _addHandlers(promise) {
        return promise
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch(error => console.log(error));
    }



}
