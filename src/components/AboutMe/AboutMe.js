import './AboutMe.css';
import Me from "../../images/me.jpg";

function AboutMe() {
  return (
    <section id="aboutMe" className="aboutMe">
      <div className="aboutMe__container">
        <div className="aboutMe__title-box">
          <h2 className="aboutMe__title">Студент</h2>
        </div>
      </div>

      <div className="aboutMe__description">
        <div className="aboutMe__info">
          <h2 className="aboutMe__name">Роман</h2>
          <h3 className="aboutMe__speciality">Фронтенд&#8209;разработчик, 29 лет</h3>
          <h4 className="aboutMe__history">
            Я родился в Ростове-на-Дону, сейчас проживаю в Москве. Окончил Ростовский государтсвенный строительный университет по специальности "Экспертиза и управление недвижимостью".
            С 2015 года работал в сфере строительства. В конце 2021 года начал проходить 10&#8209;месячные курсы в «Яндекс Практикуме» по программе «Веб&#8209;разработчик».
          </h4>
          <div className="aboutMe__links">
            <a
              href="https://github.com/kamelyanov"
              target="_blank"
              rel="noreferrer"
              className="aboutMe__link link-opacity"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/roman-kamelianov-b20b80236/"
              target="_blank"
              rel="noreferrer"
              className="aboutMe__link link-opacity"
            >
              LinkedIn
            </a>
            <a href="https://t.me/remelianov" target="_blank" rel="noreferrer" className="aboutMe__link link-opacity">
              Telegram
            </a>
          </div>
        </div>
        <img src={Me} className="aboutMe__foto" alt="Моя фотография"></img>
      </div>
    </section>
  )
}

export default AboutMe;
