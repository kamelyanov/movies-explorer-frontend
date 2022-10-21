import { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import Burger from "../Burger/Burger";
import PopupBurger from "../PopupBurger/PopupBurger";
import profile from "../../images/profile.svg"

function Navigation() {
  const laptop = 1279;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= laptop);
  const [isOpen, setIsOpen] = useState(false);

  const setActive = ({ isActive }) =>
    isActive ? "navigation__link link-opacity navigation__link_active" : "navigation__link link-opacity";

  function openBurger() {
    setIsOpen(true);
  }

  const updateWidth = useCallback(() => {
    const newWidth = window.innerWidth <= laptop;
    if (newWidth !== isMobile) {
      setIsMobile(newWidth);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  function closeAllPopups() {
    setIsOpen(false);
  }

  return (
    <>
      {isMobile ? (
        <>
          <Burger openBurger={openBurger} />
          <PopupBurger isOpen={isOpen} onClose={closeAllPopups} />
        </>
      ) : (
        <section className="navigation">
          <div className="navigation__links">
            <NavLink to="/movies" className={setActive}>
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className={setActive}>
              Сохраненные фильмы{" "}
            </NavLink>
          </div>
          <NavLink to="/profile" className="navigation__profile link-opacity">
            <h2 className="navigation__profile-title">Аккаунт</h2>
            <div className="navigation__profile-icon-container">
              <img src={profile} alt="Ссылка на профиль" className="navigation__profile-icon"></img>
            </div>
          </NavLink>
        </section>
      )}
    </>
  );
}

export default Navigation;