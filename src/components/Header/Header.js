import HeaderAuthorizedMenu from './HeaderAuthorizedMenu/HeaderAuthorizedMenu'; /* важен порядок, иначе не применятся стили */
import './Header.css';
import headerLogo from '../../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ isLoggedIn, handleBurgerMenuClick/*, onAccount */}) {
  const { pathname } = useLocation();
  const noHeaderPages = ["/404", "/signup", "/signin"];

  if (noHeaderPages.includes(pathname)) {
    return null;
  };

  return (
    <header className={`header ${(pathname==="/")&&'header_type_promo'}`}>
      <div className="header__content">
        <Link to="/"><img src={headerLogo} alt="Логотип" className="logo button" /></Link>
        {isLoggedIn
          ? <HeaderAuthorizedMenu /*onAccount={onAccount}*/ handleBurgerMenuClick={handleBurgerMenuClick} color={(pathname==="/")?'blue':'black'} />
          : <nav className="menu">
              <Link to="/signup" className="header__signup-btn link">Регистрация</Link>
              <Link to="/signin" className="header__signin-btn button">Войти</Link>
            </nav>
        }
      </div>
    </header>
  );
}

export default Header;
