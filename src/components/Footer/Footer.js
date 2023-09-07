import './Footer.css';
import { useLocation } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation();
  const noFooterPages = ["/404", "/profile", "/signup", "/signin"];

  if (noFooterPages.includes(pathname)) {
    return null;
  };

  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__nav-block">
        <p className="footer__copyright">&copy; 2023</p>
        <nav>
          <ul className="footer__links">
            <li>
              <a href="https://practicum.yandex.ru/" className="footer__link link" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
            </li>
            <li>
              <a href="https://github.com/" className="footer__link link" target="_blank" rel="noopener noreferrer">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;
