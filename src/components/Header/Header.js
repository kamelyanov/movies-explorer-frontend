import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";


function Header(props) {
  const { loggedIn } = props;
  const pathName = window.location.pathname;

  const headerClassName = `header ${loggedIn && (pathName !== "/") ? "header-dark" : ""} `

  return (
    <header className={headerClassName}>
      <Link className="header__link" to="/">
        <img src={logo} className="header__logo link-opacity" alt="Логотип"></img>
      </Link>

      {loggedIn ? (
        <Navigation />
      ) : (
        <>
          <div className="header__links">
            <Link className="header__link" to="/signup">
              <p className="headers__link-text link-opacity">Регистрация</p>
            </Link>
            <Link className="header__link" to="/signin">
              <button className="headers__link-button link-opacity">Войти</button>
            </Link>
          </div>
        </>
      )}
    </header>
  )
};

export default Header