class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  _request(endpoint, options) {
    return fetch(this._baseUrl + endpoint, options)
      .then(this._checkResponse)
  }

  loadUserInfo() {
    return this._request(`/users/me`, {
      headers: this._headers
    })
  }

  updateUserInfo({name, email}) {
    return this._request(`/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name, email
      })
    })
  }

  loadSavedMovies() {
    return this._request(`/movies`, {
      headers: this._headers
    })
  }

  saveMovie({ country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN }) {
    return this._request(`/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN
      })
    })
  }

  deleteSavedMovie(movieId) {
    return this._request(`/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.bitfilms.veitko-se.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
});

export default mainApi;
