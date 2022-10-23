import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import More from "../More/More";
import Preloader from "../Preloader/Preloader";
import { useEffect, useRef, useState } from "react";
import { fetchMovies } from "../../utils/MoviesApi";

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
  movies: "lastMovies",
};

function Movies(props) {
  const { loggedIn } = props;

  const [showPreloader, setShowPreloader] = useState(false);
  const loadingStrategyRef = useRef(getLoadingStrategy(window.innerWidth));
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem(localStorageKeys.movies) || "null") || null);
  const [visibleCount, setVisibleCount] = useState(loadingStrategyRef.current.defaultCount);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchValue, setSearchValue] = useState(localStorage.getItem(localStorageKeys.search) || "");
  const [shortFilmsOnly, setShortFilmsOnly] = useState(JSON.parse(localStorage.getItem(localStorageKeys.shortFilm) || "false") || null);

  const onSearchImpl = async () => {
    try {
      setShowPreloader(true);
      setMovies([]);
      setErrorMessage(null);

      const movies = await fetchMovies();
      const foundMovies = movies
        .filter(x => !shortFilmsOnly || x.duration <= 40)
        .filter(x => x.description.toLowerCase().includes(searchValue));
      if (foundMovies.length === 0) {
        setErrorMessage('������ �� �������');
        return;
      }

      setVisibleCount(loadingStrategyRef.current.defaultCount);
      setMovies(foundMovies);
    } catch (e) {
      setErrorMessage('�� ����� ������� ��������� ������. ��������, �������� � ����������� ��� ������ ����������. ��������� ������� � ���������� ��� ���');
    } finally {
      setShowPreloader(false);
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
    localStorage.setItem(localStorageKeys.movies, JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.shortFilm, JSON.stringify(shortFilmsOnly));
    onSearchImpl();
  }, [shortFilmsOnly]);

  return (
    <>
      <SearchForm onSearch={setSearchValue} defaultValue={searchValue} defaultShortFilmValue={shortFilmsOnly} onShortFilmToggle={setShortFilmsOnly} />
      {movies && movies.length !== 0 ? <MoviesCardList movies={movies.slice(0, visibleCount)} /> : null}
      {errorMessage}
      {showPreloader ? <Preloader /> : null}
      {movies && visibleCount < movies.length ? <More onClick={() => setVisibleCount(visibleCount + loadingStrategyRef.current.loadMoreCount)} /> : null}
    </>
  );
}

export default Movies;
