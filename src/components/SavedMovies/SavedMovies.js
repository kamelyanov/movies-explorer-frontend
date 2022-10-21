import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  const { loggedIn, handlePreloader, isPreloader } = props;

  return (
    <>
      {isPreloader ? <Preloader handlePreloader={handlePreloader} /> : ""}
      <SearchForm handlePreloader={handlePreloader} />
      <MoviesCardList />
    </>
  );
}

export default SavedMovies;