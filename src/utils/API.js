export default class Api {
    constructor() {
    }
    getProfileInfo = () => {
        return fetch('https://nomoreparties.co/v1/cohort-41/users/me', {
            headers: {
                authorization: 'c5ad47cd-94e1-4e0d-ba61-6865eeedf90c'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })

            .catch(error => console.log(error))
    }

    updateProfileInfo = (name, about) => {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-41/users/me', {
            method: 'PATCH',
            headers: {
                authorization: 'c5ad47cd-94e1-4e0d-ba61-6865eeedf90c',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })

            .catch(error => console.log(error))
    }

    updateAvatar = (link) => {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-41/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: 'c5ad47cd-94e1-4e0d-ba61-6865eeedf90c',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })

            .catch(error => console.log(error))
    }
}
