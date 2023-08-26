import './Header.css';
import headerLogo from '../../images/header-logo.svg';
import {Link, Route, Routes} from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Routes>
        <Route path="/" element={
          <div className="header__content">
            <Link to="/"><img src={headerLogo} alt="Логотип" className="header__logo button-hover-effect"/></Link>
            <nav className="header__nav-block">
              <Link to="/signup" className="header__signup-btn link-hover-effect">Регистрация</Link>
              <Link to="/signin"  className="header__signin-btn button-hover-effect">Войти</Link>
            </nav>
          </div>
        } />
      </Routes>
    </header>
  );
}

export default Header;
