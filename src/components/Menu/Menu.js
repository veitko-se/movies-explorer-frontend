import './Menu.css';
import menuAccountIcon from '../../images/account-icon.svg';
import { Link } from 'react-router-dom';

function Menu({children, name, color}) {
  return (
    <nav className={`menu menu_type_${name}`}>
      <ul className={`menu__items menu__items_type_${name}`}>
        {children}
      </ul>
      <Link to="/profile" className={`account-btn account-btn_color_${color} link`}>
        <span className={`account-btn__text account-btn__text_color_${color}`}>Аккаунт</span>
        <div className={`account-btn__circle account-btn__circle_color_${color}`}>
          <img src={menuAccountIcon} alt="Иконка аккаунта" className={`account-btn__icon account-btn__icon_color_${color}`} />
        </div>
      </Link>
    </nav>
  )
}

export default Menu;
