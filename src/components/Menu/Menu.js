import './Menu.css';
import menuAccountIcon from '../../images/account-icon.svg';
import menuClose from '../../images/menu-close.svg';
import { Link } from 'react-router-dom';

function Menu({ isMenuOpen, handleCloseMenuClick }) {
  return (
    <section className={`menu-block ${isMenuOpen && 'menu-block_visible'}`}>
      <div className='menu-block__cover' onClick={handleCloseMenuClick}></div>
      <div className={`menu-block__content ${isMenuOpen && 'menu-block__content_visible'}`}>
        <button className="menu-block__close-btn button" onClick={handleCloseMenuClick}><img src={menuClose} alt="Закрыть" className="menu-block__close-icon" /></button>
        <nav className='menu menu_type_burger'>
          <ul className='menu__items menu__items_type_burger'>
            <li><Link to="/" className="menu__item menu__item_type_burger link">Главная</Link></li>
            <li><Link to="/movies" className="menu__item menu__item_type_burger link link_highlighted">Фильмы</Link></li>
            <li><Link to="/saved-movies" className="menu__item menu__item_type_burger link">Сохранённые фильмы</Link></li>
          </ul>
          <Link to="/profile" className="account-btn account-btn_color_grey link">
            <span className="account-btn__text">Аккаунт</span>
            <div className="account-btn__circle account-btn__circle_color_grey"><img src={menuAccountIcon} alt="Иконка аккаунта" className="account-btn__icon" /></div>
          </Link>
        </nav>
      </div>
    </section>
  )
}

export default Menu;
