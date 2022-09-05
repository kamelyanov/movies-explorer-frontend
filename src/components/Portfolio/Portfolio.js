import './Portfolio.css';
import Arrow from "../../images/arrow.svg";

function Portfolio () {
  return (
    <section id="portfolio" className="portfolio">
    <div className="portfolio__container">
      <h2 className="portfolio__title">Портфолио</h2>

      <a href="https://mesto.kamelianov.nomoredomains.sbs/" target="_blank" rel="noreferrer" className="portfolio__box link-opacity">
        <h2 className="portfolio__info">
          Одностраничное приложение на React <span className="portfolio__info-span">MESTO</span>
        </h2>
        <img src={Arrow} className="portfolio__info-arrow" alt="Стрелка"></img>
      </a>

      <a href="https://kamelyanov.github.io/russian-travel/" target="_blank" rel="noreferrer" className="portfolio__box link-opacity">
        <h2 className="portfolio__info">
          Адаптивный сайт <span className="portfolio__info-span">RUSSIAN TRAVEL</span>
        </h2>
        <img src={Arrow} className="portfolio__info-arrow" alt="Стрелка"></img>
      </a>

      <a href="https://kamelyanov.github.io/mesto/" target="_blank" rel="noreferrer" className="portfolio__box link-opacity">
        <h2 className="portfolio__info">
          Одностраничное приложение на чистом JS <span className="portfolio__info-span">MESTO</span>
        </h2>
        <img src={Arrow} className="portfolio__info-arrow" alt="Стрелка"></img>
      </a>
    </div>
  </section>
  )
}

export default Portfolio