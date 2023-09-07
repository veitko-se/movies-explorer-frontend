import { Link } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';
import headerLogo from '../../../images/header-logo.svg';
import './Login.css';


function Login() {
  return (
    <section className="auth">
      <Link to="/"><img src={headerLogo} alt="Логотип" className="logo button" /></Link>
      <UserForm formName="auth" title="Рады видеть!" buttonText="Войти" />
      <p className="auth__question-block">Ещё не зарегистрированы?&nbsp;
        <Link to="/signup" className="button auth__btn">Регистрация</Link>
      </p>
    </section>
  )
}

export default Login;
