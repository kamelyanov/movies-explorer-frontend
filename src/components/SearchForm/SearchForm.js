import "./SearchForm.css"; 
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import searchIcon from '../../images/search-icon.svg';
import searchIconWhite from '../../images/search-icon-white.svg';

function SearchForm() {
  return (
    <section className="searchForm">
      <div className="searchForm__box">
        <div className="searchForm__search-bar">
          <div className="searchForm__search-side">
            <img src={searchIcon} className="searchForm__icon" alt="Иконка поиска"></img>
            <input className="searchForm__search-input" required placeholder="Фильм"></input>
            <div className="searchForm__findIcon-box link-opacity">
              <img src={searchIconWhite} className="searchForm__findIcon link-opacity" alt="Кнопка поиска"></img>
            </div>
          </div>
          <div className="searchForm__format-side">
            <FilterCheckbox />
            <h2 className="searchForm__format-title">Короткометражки</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;