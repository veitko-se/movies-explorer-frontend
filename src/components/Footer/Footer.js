import './Footer.css';

function Footer() {
  return (
    <section className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div class="footer__nav-block">
        <p class="footer__copyright">&copy; 2023</p>
        <nav>
          <ul class="footer__links">
            <li>
              <a href="https://practicum.yandex.ru/" class="footer__link link-hover-effect" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
            </li>
            <li>
              <a href="https://github.com/" class="footer__link link-hover-effect" target="_blank" rel="noopener noreferrer">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default Footer;
