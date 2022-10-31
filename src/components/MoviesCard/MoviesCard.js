import "./MoviesCard.css";
import deleteFavoritedMovieIcon from "../../images/icon__fovarite_delete.svg";
import isFavoriteIcon from "../../images/icon-movies-favorited.svg";

function MoviesCard(props) {
  const { movie, handleSaveFilm, handleDeleteFilm, deleteType } = props;

  return (
    <li className="moviesCard">
      <div className="moviesCard__info">
        <p className="moviesCard__title">{movie.nameRU}</p>
        <p className="moviesCard__duration">{movie.duration} мин</p>
      </div>
      <a className="moviesCard__image-link-to-trailer" href={movie.trailerLink} target="_blank">
        <img src={movie.imageUrl} alt="Обложка фильма" className="moviesCard__image"></img>
      </a>
      {movie.saved
        ? (deleteType === "cross" ?
          <button type="button" className="moviesCard__favorited-delete link-opacity"
            onClick={() => {
              handleDeleteFilm(movie.id);
            }}>
            <img src={deleteFavoritedMovieIcon} alt="Иконка удалить из избранного" className="moviesCard__favorites-icon"></img>
          </button>
          : <button type="button"
            className="moviesCard__isFavorited link-opacity"
            onClick={() => {
              handleDeleteFilm(movie.id);
            }}
          >
            <img src={isFavoriteIcon} alt="Иконка добавленного в избранное" className="moviesCard__favorites-icon"></img>
          </button>
        ) : (
          <button type="button" className="moviesCard__favorited link-opacity" onClick={() => handleSaveFilm(movie.id)}>Сохранить</button>
        )}
    </li>
  )
}

export default MoviesCard;
