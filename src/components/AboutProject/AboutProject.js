import './AboutProject.css'

function AboutProject () {
  return (
    <section className="about-project">
      <div className="about-project__title-box" >
        <p className="about-project__title">О проекте</p>
      </div>

      <ul className="about-project__description">
        <li className="about-project__card">
          <p className="about-project__card-title">Дипломный проект включал 5 этапов</p>
          <p className="about-project__card-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about-project__card">
          <p className="about-project__card-title">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__card-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>

      <div className="about-project__bar">
        <div className="about-project__bar_short">
          <div className="bar_short__title">
            1 неделя
          </div>
          <p className="about-project__bar_subtitle">Back-end</p>
        </div>
        <div className="about-project__bar_long">
          <div className="bar_long__title">
            4 недели
          </div>
          <p className="about-project__bar_subtitle">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject