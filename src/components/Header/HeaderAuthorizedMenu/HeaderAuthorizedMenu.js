import { NavLink } from 'react-router-dom';
import Menu from '../../Menu/Menu';
import './HeaderAuthorizedMenu.css';
import headerBurgerIcon from '../../../images/header-burger-icon.svg';

function HeaderAuthorizedMenu({ handleBurgerMenuClick, color }) {
  const navLinkClassName = (
    ({ isActive }) => isActive? 'menu__item link_highlighted link': 'menu__item link'
  );

  return (
    <>
      <Menu name='header-authorized' color={color}>
        <li><NavLink to="/movies" className={navLinkClassName} >Фильмы</NavLink></li>
        <li><NavLink to="/saved-movies" className={navLinkClassName}>Сохранённые фильмы</NavLink></li>
      </Menu>
      <button className="burger-btn button" onClick={handleBurgerMenuClick} type="button"><img src={headerBurgerIcon} alt="Меню" className="burger-btn__icon" /></button>
    </>
  )
}

export default HeaderAuthorizedMenu;
