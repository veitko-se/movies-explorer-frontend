import {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../Menu';
import './SideMenu.css';
import menuClose from '../../../images/menu-close.svg';

function SideMenu({ isMenuOpen, handleCloseMenuClick}) {
  const navLinkClassName = (
    ({ isActive }) => isActive? 'menu__item menu__item_type_side link link_highlighted': 'menu__item menu__item_type_side link'
  );

  useEffect(() => {
    handleShowScroll();
  }, [isMenuOpen]);

  function handleShowScroll() {
    isMenuOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
  };

  return (
    <section className={`menu-block ${isMenuOpen && 'menu-block_visible'}`} aria-label='Навигация по сайту'>
      <div className='menu-block__cover' onClick={handleCloseMenuClick}></div>
      <div className={`menu-block__content ${isMenuOpen && 'menu-block__content_visible'}`}>
        <button className="menu-block__close-btn button" onClick={handleCloseMenuClick} type="button">
          <img src={menuClose} alt="Закрыть" className="menu-block__close-icon" />
        </button>
        <Menu name='side' color='black' onAccountClick={handleCloseMenuClick}>
          <li><NavLink to="/" className={navLinkClassName} onClick={handleCloseMenuClick}>Главная</NavLink></li>
          <li><NavLink to="/movies" className={navLinkClassName} onClick={handleCloseMenuClick}>Фильмы</NavLink></li>
          <li><NavLink to="/saved-movies" className={navLinkClassName} onClick={handleCloseMenuClick}>Сохранённые фильмы</NavLink></li>
        </Menu>
      </div>
    </section>
  )
}

export default SideMenu;
