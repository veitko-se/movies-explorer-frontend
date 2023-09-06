import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Menu from '../Menu';
import './SideMenu.css';
import menuClose from '../../../images/menu-close.svg';

function SideMenu({ isMenuOpen, handleCloseMenuClick }) {
  useEffect(() => {
    handleShowScroll();
  }, [isMenuOpen]);

  function handleShowScroll() {
    isMenuOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'unset';
  };

  return (
    <section className={`menu-block ${isMenuOpen && 'menu-block_visible'}`}>
      <div className='menu-block__cover' onClick={handleCloseMenuClick}></div>
      <div className={`menu-block__content ${isMenuOpen && 'menu-block__content_visible'}`}>
        <button className="menu-block__close-btn button" onClick={handleCloseMenuClick}><img src={menuClose} alt="Закрыть" className="menu-block__close-icon" /></button>
        <Menu name='side' color='black'>
          <li><Link to="/" className="menu__item menu__item_type_side link">Главная</Link></li>
          <li><Link to="/movies" className="menu__item menu__item_type_side link link_highlighted">Фильмы</Link></li>
          <li><Link to="/saved-movies" className="menu__item menu__item_type_side link">Сохранённые фильмы</Link></li>
        </Menu>
      </div>
    </section>
  )
}

export default SideMenu;