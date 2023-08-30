import './Menu.css';
import menuAccountIcon from '../../images/account-icon.svg';
import { Link } from 'react-router-dom';

function Menu({children, name}) {
  return (
    <nav className={`menu menu_type_${name}`}>
      <ul className={`menu__items menu__items_type_${name}`}>
        {children}
      </ul>
      <Link to="/profile" className={`account-btn account-btn_type_${name} link`}>
        <span className={`account-btn__text account-btn__text_type_${name}`}>Аккаунт</span>
        <div className={`account-btn__circle account-btn__circle_type_${name}`}>
          <img src={menuAccountIcon} alt="Иконка аккаунта" className={`account-btn__icon account-btn__icon_type_${name}`} />
        </div>
      </Link>
    </nav>
  )
}

export default Menu;
