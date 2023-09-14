import { Link } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';
import headerLogo from '../../../images/header-logo.svg';
import './Register.css';


function Register({onRegister, isServerError}) {
  return (
    <main className="auth">
      <Link to="/"><img src={headerLogo} alt="Логотип" className="logo button" /></Link>
      <UserForm formName="auth" title="Добро пожаловать!" buttonText="Зарегистрироваться" onSubmit={onRegister} isServerError={isServerError} />
      <p className="auth__question-block">Уже зарегистрированы?&nbsp;
        <Link to="/signin" className="button auth__btn">Войти</Link>
      </p>
    </main>
  )
}

export default Register;
