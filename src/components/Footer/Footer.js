import { useLocation } from 'react-router-dom';
import "./Footer.css";

function Footer() {
  const location = useLocation();

  return (
    <>
      {
        (location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ||
          location.pathname === '/profile' ||
          location.pathname === '/') ?
          <footer className="footer">
            <div className="footer__container">
              <div className="footer__box">
                <h2 className="footer__box-title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
              </div>
              <div className="footer__info">
                <h2 className="footer__year">&#169; 2022</h2>
                <div className="footer__links">
                  <a href="https://practicum.yandex.ru/web/" target="_blank" rel="noreferrer" className="footer__link link-opacity">
                    Яндекс.Практикум
                  </a>
                  <a href="https://practicum.yandex.ru/web/" target="_blank" rel="noreferrer" className="footer__link link-opacity">
                    Github
                  </a>
                </div>
              </div>
            </div>
          </footer> : <></>
      }
    </>
  );
}

export default Footer;