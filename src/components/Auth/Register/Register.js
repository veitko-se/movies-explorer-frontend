import { Link } from 'react-router-dom';
import UserForm from '../../UserForm/UserForm';
import headerLogo from '../../../images/header-logo.svg';
import './Register.css';


function Register() {
  return (
    <section className="auth">
      <Link to="/"><img src={headerLogo} alt="Логотип" className="header__logo button" /></Link>
      <UserForm formName="auth" title="Добро пожаловать!" buttonText="Зарегистрироваться" />
      <p className="auth__question-block">Уже зарегистрированы?&nbsp;
        <Link to="/signin" className="button auth__btn">Войти</Link>
      </p>
    </section>
  )
}

export default Register;
