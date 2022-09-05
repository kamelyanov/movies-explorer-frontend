import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';

function Header () {
  return (
    <header className="header">
      <img src={logo} className="header__logo link-opacity" alt="Логотип"></img>
      <div className="header__links">
        <p className="headers__link-text link-opacity">Регистрация</p>
        <button className="headers__link-button link-opacity">Войти</button>
      </div>
    </header>
  )
};

export default Header