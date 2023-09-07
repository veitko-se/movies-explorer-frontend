import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../../images/about-me-photo.jpg';

function AboutMe() {
  return (
    <section className="about-me landing__element">
      <h2 className="landing__element-title">Студент</h2>
      <div className="about-me__content">
        <h3 className="about-me__title">София</h3>
        <p className="about-me__subtitle">Фронтенд-разработчик, 31 год</p>
        <p className="about-me__text">Я родилась в Ставрополе, в СКФУ закончила прикладную информатику в экономике. В настоящее время живу в Москве. Замужем.
          Люблю животных и путешествия. С&nbsp;2017 года работаю инженером в ГБУЗ «МИАЦ ЯНАО», с 2014 года подрабатываю в&nbsp;операторе связи.
          Недавно увлеклась веб-разработкой и поступила на курс от&nbsp;Яндекс.Практикума.</p>
        <a href="https://github.com/veitko-se" className="about-me__link link" target="_blank" rel="noopener noreferrer">Github</a>
        <img src={photo} alt="Фотография разработчика проекта" className="about-me__photo" />
      </div>
      <Portfolio />
    </section>
  )
}

export default AboutMe;
