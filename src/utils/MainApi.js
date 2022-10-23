export const BASE_URL = "https://api.movies.kamelianov.nomoredomains.sbs";
export const BEATFILM_URL = "https://api.nomoreparties.co";

const handleResponse = response => response.ok ? response.json() : Promise.reject('Ошибка на сервере: ' + response.status + ' - ' + response.statusText)

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
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