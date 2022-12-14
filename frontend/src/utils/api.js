class Api {
    constructor({ address, token, groupId }) {
        // стандартная реализация -- объект options
        this._token = token;
        this._groupId = groupId;
        this._address = address;

        // Запросы в примере работы выполняются к старому Api, в новом URL изменены.
    }

    getAppInfo(token) {
        return Promise.all([this.getCardList(token), this.getUserInfo(token)]);
    }

    getCardList(token) {
        return fetch(`${this._address}/cards`, {
                headers: {
                    authorization: token,
                },
            })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    addCard({ name, link }) {
        return fetch(`${this._address}/cards`, {
                method: 'POST',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    link,
                }),
            })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    removeCard(cardID) {
        return fetch(`${this._address}/cards/${cardID}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._token,
                },
            })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    getUserInfo(token) {
        return fetch(`${this._address}/users/me`, {
                headers: {
                    authorization: token,
                },
            })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    setUserInfo({ name, about }) {
        return fetch(`${this._address}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: localStorage.getItem('jwt'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    about,
                }),
            })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    setUserAvatar({ avatar }) {
        return fetch(`${this._address}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: localStorage.getItem('jwt'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    avatar,
                }),
            })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }

    changeLikeCardStatus(cardID, like) {
        // Обычная реализация: 2 разных метода для удаления и постановки лайка.
        return fetch(`${this._address}/cards/${cardID}/likes`, {
                method: like ? 'PUT' : 'DELETE',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    }
}

const api = new Api({
    address: 'https://api.superfront.students.nomoredomains.icu',
    token: localStorage.getItem('jwt'),
});

export default api;