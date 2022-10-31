import "./PopupBurger.css";
import closePopupIcon from "../../images/close-popup.svg";
import { NavLink, Link } from "react-router-dom";
import profile from "../../images/profile.svg";

function PopupBurger(props) {
  const { isOpen, onClose } = props;

  const setActive = ({ isActive }) =>
    isActive ? "popupBurger__link link-opacity popupBurger__link_active" : "popupBurger__link link-opacity";

  return (
    <section className={`popupBurger ${isOpen ? "popupBurger_opened" : ""}`}>
      <img
        src={closePopupIcon}
        className="popupBurger_exit-button link-opacity"
        onClick={onClose}
        alt="Кнопка 'Выйти'"
      ></img>
      <div className="popupBurger__container">
        <div className="popupBurger__links">
          <NavLink to="/" className={setActive} onClick={onClose}>
            Главная
          </NavLink>
          <NavLink to="/movies" className={setActive} onClick={onClose}>
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className={setActive} onClick={onClose}>
            Сохраненные фильмы{" "}
          </NavLink>
        </div>
        <Link to="/profile" className="popupBurger__profile link-opacity" onClick={onClose}>
          <h2 className="popupBurger__profile-title">Аккаунт</h2>
          <div className="popupBurger__profile-icon-container">
            <img src={profile} alt="Ссылка на профиль" className="popupBurger__profile-icon"></img>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default PopupBurger;
