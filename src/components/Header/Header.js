import './Header.css';
import '../Menu/Menu.css';
import headerLogo from '../../images/header-logo.svg';
import headerAccountIcon from '../../images/account-icon.svg';
import headerBurgerIcon from '../../images/header-burger-icon.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header({ loggedIn, handleBurgerMenuClick }) {
  return (
    <header className="header">
      <Routes>
        <Route path="/" element={
          <div className="header__content">
            <Link to="/"><img src={headerLogo} alt="Логотип" className="header__logo button" /></Link>
            {loggedIn
              ? <>
                  <nav className="menu menu_type_authorized header__menu">
                    <ul className="menu__items">
                      <li><Link to="/movies" className="menu__item link">Фильмы</Link></li>
                      <li><Link to="/saved-movies" className="menu__item link">Сохранённые фильмы</Link></li>
                    </ul>
                    <Link to="/profile" className="account-btn link">
                      <span className="account-btn__text">Аккаунт</span>
                      <div className="account-btn__circle"><img src={headerAccountIcon} alt="Иконка аккаунта" className="account-btn__icon" /></div>
                    </Link>
                  </nav>
                  <button className="burger-btn button" onClick={handleBurgerMenuClick} ><img src={headerBurgerIcon} alt="Меню" className="burger-btn__icon" /></button>
                </>
              : <nav className="menu header__menu">
                  <Link to="/signup" className="header__signup-btn link">Регистрация</Link>
                  <Link to="/signin" className="header__signin-btn button">Войти</Link>
                </nav>
            }
          </div>
        } />
      </Routes>
    </header>
  );
}

export default Header;
