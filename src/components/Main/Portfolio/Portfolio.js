import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a className="portfolio__item-link link" href='https://github.com/veitko-se/how-to-learn' target="_blank" rel="noopener noreferrer">
            Статичный сайт<span className="portfolio__item-icon">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__item-link link" href='https://veitko-se.github.io/russian-travel/index.html' target="_blank" rel="noopener noreferrer">
            Адаптивный сайт<span className="portfolio__item-icon">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__item-link link" href='https://mesto.veitko-se.students.nomoredomains.work' target="_blank" rel="noopener noreferrer">
            Одностраничное приложение<span className="portfolio__item-icon">↗</span>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
