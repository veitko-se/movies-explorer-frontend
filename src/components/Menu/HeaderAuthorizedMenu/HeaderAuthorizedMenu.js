import { Link } from 'react-router-dom';
import Menu from '../Menu';
import './HeaderAuthorizedMenu.css';
import headerBurgerIcon from '../../../images/header-burger-icon.svg';

function HeaderAuthorizedMenu({ handleBurgerMenuClick, color/*, onAccount */}) {
  return (
    <>
      <Menu name='header-authorized' color={color} /*onAccount={onAccount}*/>
        <li><Link to="/movies" className="menu__item link_highlighted link">Фильмы</Link></li>
        <li><Link to="/saved-movies" className="menu__item link">Сохранённые фильмы</Link></li>
      </Menu>
      <button className="burger-btn button" onClick={handleBurgerMenuClick} type="button"><img src={headerBurgerIcon} alt="Меню" className="burger-btn__icon" /></button>
    </>
  )
}

export default HeaderAuthorizedMenu;
