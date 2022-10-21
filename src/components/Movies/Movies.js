import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import More from "../More/More";
import Preloader from "../Preloader/Preloader";

function Movies(props) {
  const { loggedIn, handlePreloader, isPreloader } = props;

  return (
    <>
      {isPreloader ? <Preloader handlePreloader={handlePreloader} /> : ""}
      <SearchForm handlePreloader={handlePreloader} />
      <MoviesCardList />
      <More />
    </>
  );
}

export default Movies;