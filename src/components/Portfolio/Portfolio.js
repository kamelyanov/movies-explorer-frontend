import './Portfolio.css';
import Arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__items">
          <li className="portfolio__item">
            <a href="https://mesto.kamelianov.nomoredomains.sbs/" className="portfolio__item-link link-opacity" target="_blank" rel="noreferrer">
              Одностраничное приложение на React MESTO
            </a>
          </li>
          <li className="portfolio__item">
            <a href="https://kamelyanov.github.io/russian-travel/" className="portfolio__item-link link-opacity" target="_blank" rel="noreferrer">
              Адаптивный сайт RUSSIAN TRAVEL
            </a>
          </li>
          <li className="portfolio__item">
            <a href="https://kamelyanov.github.io/mesto/" className="portfolio__item-link link-opacity" target="_blank" rel="noreferrer">
              Одностраничное приложение на чистом JS MESTO
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio