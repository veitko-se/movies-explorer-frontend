import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import './HeaderAuthorizedMenu.css';
import headerBurgerIcon from '../../images/header-burger-icon.svg';

function HeaderAuthorizedMenu({ handleBurgerMenuClick, color }) {
  return (
    <>
      <Menu name='header-authorized' color={color}>
        <li><Link to="/movies" className="menu__item link">Фильмы</Link></li>
        <li><Link to="/saved-movies" className="menu__item link">Сохранённые фильмы</Link></li>
      </Menu>
      <button className="burger-btn button" onClick={handleBurgerMenuClick} ><img src={headerBurgerIcon} alt="Меню" className="burger-btn__icon" /></button>
    </>
  )
}

export default HeaderAuthorizedMenu;
