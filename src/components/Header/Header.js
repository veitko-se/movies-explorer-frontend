import HeaderAuthorizedMenu from '../HeaderAuthorizedMenu/HeaderAuthorizedMenu'; /* важен порядок, иначе не применятся стили */
import './Header.css';
import headerLogo from '../../images/header-logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header({ loggedIn, handleBurgerMenuClick }) {
  return (
    <header className="header">
      <Routes>
        <Route path="/" element={
          <div className="header__content">
            <Link to="/"><img src={headerLogo} alt="Логотип" className="header__logo button" /></Link>
            {loggedIn
              ? <HeaderAuthorizedMenu handleBurgerMenuClick={handleBurgerMenuClick}/>
              : <nav className="menu">
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
