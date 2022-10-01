import "./MoviesCard.css";
import { useState } from "react";
import favoritedMovie from "../../images/icon-movies-favorired.svg"

function MoviesCard() {
  const [favorite, setfavorite] = useState(false);
  const pathName = window.location.pathname;

  function favoriteMovie() {
    if (favorite === true ? setfavorite(false) : setfavorite(true));
  }

    return (
    <div className="moviesCard"> 
      <div className="moviesCard__info">
        <p className="moviesCard__title">Название фильма</p>
        <p className="moviesCard__duration">27 минут</p>
      </div>
      <img src="https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg" alt="Обложка фильма" className="moviesCard__image"></img>

      {pathName === "/saved-movies" ? (
        <button type="button" className="moviesCard__favorited-delete link-opacity">
          <img src={favoritedMovie} alt="Иконка удалить из избранного" className="moviesCard__favorites-icon"></img>
        </button>
      ) : (
        <button type="button" className="moviesCard__favorited link-opacity">
          Сохранить
        </button>
      )}
    </div>
  )
}

export default MoviesCard;