import "./MoviesCard.css";
import { useState, useEffect } from "react";
import deleteFavoritedMovieIcon from "../../images/icon__fovarite_delete.svg";
import isFavoriteIcon from "../../images/icon-movies-favorited.svg";
import { getThumbnailUrl } from "../../utils/MoviesApi";

function MoviesCard(props) {
  const {movie, handleSaveFilm, handleDeleteFilm, saveMmovies} = props;
  const [isFavorited, setIsFavorited] = useState(false);
  const pathName = window.location.pathname;

  useEffect(() => {
    saveMmovies.map((saveMovie) => {
      if (saveMovie.movieId === movie.id) {
        setIsFavorited(true);
      }
    });
  }, [saveMmovies]);

  return (
    <li className="moviesCard">
      <div className="moviesCard__info">
        <p className="moviesCard__title">{movie.nameRU}</p>
        <p className="moviesCard__duration">{movie.duration} мин</p>
      </div>
      <img src={getThumbnailUrl(movie)} alt="Обложка фильма" className="moviesCard__image"></img>

      {pathName === "/saved-movies" ? (
        <button type="button" className="moviesCard__favorited-delete link-opacity" 
          onClick={() => {
          handleDeleteFilm(movie);
        }}>
          <img src={deleteFavoritedMovieIcon} alt="Иконка удалить из избранного" className="moviesCard__favorites-icon"></img>
        </button>
      ) : (
        <button type="button"
          className={`${isFavorited ? "moviesCard__isFavorited" : "moviesCard__favorited"} link-opacity`}
          onClick={() => {
            if (isFavorited) {
              handleDeleteFilm(saveMmovies.find((saveMovie) => saveMovie.movieId === movie.id));
            } else {
              handleSaveFilm(movie);
            }
            setIsFavorited(!isFavorited);
          }}
        >
          {
            isFavorited ?
              <img src={isFavoriteIcon} alt="Иконка добавленного в избранное" className="moviesCard__favorites-icon"></img>
              :
              "Сохранить"
          }
        </button>
      )}
    </li>
  )
}

export default MoviesCard;
