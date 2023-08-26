import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project landing__element" id="about-project">
      <h2 className="landing__element-title">О проекте</h2>
      <div className="about-project__content">
        <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="timeline">
        <div className="timeline__title-block timeline__title-block_color_green">
          <h3 className="timeline__title">1 неделя</h3>
        </div>
        <p className="timeline__text">Back-end</p>
        <div className="timeline__title-block">
          <h3 className="timeline__title">4 недели</h3>
        </div>
        <p className="timeline__text">Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;
