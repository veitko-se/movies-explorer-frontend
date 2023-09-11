import { MOVIE_BASE_URL } from '../utils/constants';

class MoviesApi {
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

  loadAllMovies() {
    return this._request(`/beatfilm-movies`, {
      headers: this._headers
    })
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

export default moviesApi;
