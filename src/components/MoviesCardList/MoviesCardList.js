import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const {
    movie,
    saveMmovies,
    handleSaveFilm,
    handleDeleteFilm,
  } = props;
  
  console.log(props.movies);
  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__container">
        {props.movies.map(movie => 
            <MoviesCard 
              key={movie.id} 
              movie={movie}
              saveMmovies={saveMmovies}
              handleSaveFilm={handleSaveFilm}
              handleDeleteFilm={handleDeleteFilm}
          />
        )}
      </ul>
    </section>
  );
}

export default MoviesCardList;
