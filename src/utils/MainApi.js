export const BASE_URL = "https://api.movies.kamelianov.nomoredomains.sbs";
export const BEATFILM_URL = "https://api.nomoreparties.co";

const handleResponse = response => response.ok ? response.json() : Promise.reject('Ошибка на сервере: ' + response.status + ' - ' + response.statusText)

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
  .then(handleResponse)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  .then(handleResponse)
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
  .then(handleResponse)
};

export const patchUserInfo = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
    }),
  })
  .then(handleResponse)
};

export const saveFilm = (card) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: `${BEATFILM_URL + card.image.url}`,
      trailerLink: card.trailerLink,
      thumbnail: card.trailerLink,
      movieId: card.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
    }),
  })
  .then(handleResponse)
};

export const getFilms = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
  .then(handleResponse)
};

export const deleteFilm = (cardId) => {
  return fetch(`${BASE_URL}/movies/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
  .then(handleResponse)
};
