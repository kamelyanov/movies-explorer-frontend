import { useRef } from "react";
import "./SearchForm.css";
import searchIcon from '../../images/search-icon.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  const { onSearch, defaultValue, onShortFilmToggle, defaultShortFilmValue } = props;

  const searchInputRef = useRef();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!searchInputRef.current) {
      return;
    }

    const searchString = searchInputRef.current.value.trim();

    if (searchString.length === 0) {
      return;
    }

    onSearch(searchString);
  };

  return (
    <section className="searchForm">
      <div className="searchForm__box">
        <div className="searchForm__search-bar">

          <form className="searchForm__search-side" onSubmit={onFormSubmit}>
            <img src={searchIcon} className="searchForm__icon" alt="Иконка поиска"></img>

            <input className="searchForm__search-input" required placeholder="Фильм" ref={searchInputRef} defaultValue={defaultValue} ></input>
            <button className="searchForm__findIcon-box link-opacity"></button>
          </form>
          <div className="searchForm__format-side">

            <FilterCheckbox defaultValue={defaultShortFilmValue} onChange={onShortFilmToggle} />
            <h2 className="searchForm__format-title">Короткометражки</h2>
          </div>
        </div>
        </div>
        </section>
  );
}


export default SearchForm;