import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio landing__element">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <p className="portfolio__item-text">Статичный сайт</p>
          <a className="portfolio__item-link link" href='https://github.com/veitko-se/how-to-learn' target="_blank" rel="noopener noreferrer">↗</a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__item-text">Адаптивный сайт</p>
          <a className="portfolio__item-link link" href='https://veitko-se.github.io/russian-travel/index.html' target="_blank" rel="noopener noreferrer">↗</a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__item-text">Одностраничное приложение</p>
          <a className="portfolio__item-link link" href='https://mesto.veitko-se.students.nomoredomains.work' target="_blank" rel="noopener noreferrer">↗</a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
