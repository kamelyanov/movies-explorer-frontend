import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import More from "../More/More";
import Preloader from "../Preloader/Preloader";
import { useEffect, useRef, useState } from "react";
import { apiUrl, fetchMovies } from "../../utils/MoviesApi";
import './Movies.css';

function getLoadingStrategy(screenWidth) {
  if (screenWidth >= 1280) {
    return { defaultCount: 12, loadMoreCount: 3 };
  }

  if (screenWidth >= 768) {
    return { defaultCount: 8, loadMoreCount: 2 };
  }

  return { defaultCount: 5, loadMoreCount: 2 };
}

const localStorageKeys = {
  search: "lastSearch",
  shortFilm: "lastShortFilm",
};

function Movies(props) {
  const { savedMovies, handleSaveFilm, handleDeleteFilm } = props;
  const [showPreloader, setShowPreloader] = useState(false);
  const loadingStrategyRef = useRef(getLoadingStrategy(window.innerWidth));
  const [movies, setMovies] = useState(null);
  const [visibleCount, setVisibleCount] = useState(loadingStrategyRef.current.defaultCount);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchValue, setSearchValue] = useState(localStorage.getItem(localStorageKeys.search) || "");
  const [shortFilmsOnly, setShortFilmsOnly] = useState(JSON.parse(localStorage.getItem(localStorageKeys.shortFilm) || "false") || false);
  const isLoadingRef = useRef(false);

  const onSearchImpl = async () => {
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;

    try {
      if (searchValue.length === 0) {
        setErrorMessage('Нужно ввести ключевое слово')
        setMovies([]);
        return;
      }

      setShowPreloader(true);
      setMovies([]);
      setErrorMessage(null);

      const movies = await fetchMovies();
      const foundMovies = movies
        .filter(x => !shortFilmsOnly || x.duration <= 40)
        .filter(x => x.nameRU.toLowerCase().includes(searchValue.toLowerCase()));

      if (foundMovies.length === 0) {
        setErrorMessage('Ничего не найдено');
        return;
      }

      setVisibleCount(loadingStrategyRef.current.defaultCount);
      setMovies(foundMovies);
    } catch (e) {
      setErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    } finally {
      setShowPreloader(false);
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    let timeoutId = null;
    const onResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const newLoadingStrategy = getLoadingStrategy(window.innerWidth);
        loadingStrategyRef.current = newLoadingStrategy;
        setVisibleCount(prevVal => Math.max(newLoadingStrategy.defaultCount, prevVal));
      }, 100);
    };

    window.addEventListener("resize", onResize);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.search, searchValue);
    onSearchImpl();
  }, [searchValue]);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.shortFilm, JSON.stringify(shortFilmsOnly));
    onSearchImpl();
  }, [shortFilmsOnly]);

  return (
    <>
      <SearchForm onSearch={setSearchValue} defaultValue={searchValue} defaultShortFilmValue={shortFilmsOnly} onShortFilmToggle={setShortFilmsOnly} />
      {movies && movies.length !== 0 ? <MoviesCardList handleSaveFilm={movieId => {
        handleSaveFilm(movies.find(m => m.id === movieId));
      }} handleDeleteFilm={handleDeleteFilm} movies={movies.slice(0, visibleCount).map(movie => ({
        nameRU: movie.nameRU,
        duration: movie.duration,
        imageUrl: `${apiUrl}/${movie.image.url}`,
        id: movie.id,
        saved: savedMovies.find(x => x.movieId === movie.id) !== undefined,
        trailerLink: movie.trailerLink,
      }))} /> : null}
      <span className="movies-errorMessage">{errorMessage}</span>
      {showPreloader ? <Preloader /> : null}
      {movies && visibleCount < movies.length ? <More onClick={() => setVisibleCount(visibleCount + loadingStrategyRef.current.loadMoreCount)} /> : null}
    </>
  );
}

export default Movies;
