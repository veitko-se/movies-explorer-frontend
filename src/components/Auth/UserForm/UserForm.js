import { useRef, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import useFormAndValidation from '../../../hooks/useFormAndValidation';
import Form from '../../Form/Form';
import './UserForm.css';

function UserForm({ formName, title, isEditable = true, buttonText, onSubmit, isServerError, isServerApplied, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { pathname } = useLocation();
  const { values, errors, isValid, handleChange, setValues, setIsValid } = useFormAndValidation();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditable]);

  useEffect(() => {
    if (currentUser && (formName==='profile')) {
      setValues({name: currentUser.name, email: currentUser.email});
    }
  }, [currentUser]);

  useEffect(() => {
    if ((currentUser.name===values.name)&&(currentUser.email===values.email)) {
      setIsValid(false);
    }
  }, [values]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values.name, values.email, values.password);
  };

  return (
    <Form
      formName={formName}
      title={title} buttonText={buttonText}
      isButtonVisible={isEditable}
      values={values} errors={errors} isValid={isValid} handleChange={handleChange} setIsValid={setIsValid}
      handleSubmit={handleSubmit}
      isServerError={isServerError}
      isServerApplied={isServerApplied}
      isLoading={isLoading}
    >
      { !(pathname==='/signin') &&
        <input
          title="Имя"
          aria-label="Имя"
          name="name"
          type="text"
          className={`form__input form__input_type_${formName} ${errors.name && 'form__input_type_error'}`}
          id="input-name"
          placeholder="введите ваше имя"
          required
          minLength="2"
          maxLength="40"
          value={values.name || ''}
          onChange={handleChange}
          disabled={!isEditable}
          ref={inputRef}
          pattern="^[a-zA-Zа-яА-Я\-\s]+$"
        />
      }

        <input
          title="E-mail"
          aria-label="E-mail"
          name="email"
          type="email"
          className={`form__input form__input_type_${formName} ${errors.email && 'form__input_type_error'}`}
          id="input-email"
          placeholder="введите ваш e-mail"
          required
          minLength="2"
          maxLength="40"
          value={values.email || ''}
          onChange={handleChange}
          disabled={!isEditable}
          pattern="^[a-z0-9\._%+\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$"
        />

      { !(pathname==='/profile') &&
        <input
          title="Пароль"
          aria-label="Пароль"
          type="password"
          className={`form__input form__input_type_${formName} ${errors.password&&'form__input_type_error'}`}
          id="input-password"
          placeholder="введите пароль"
          required
          name="password"
          minLength="2"
          maxLength="40"
          value={values.password||''}
          onChange={handleChange}
          disabled={!isEditable}
        />
      }
    </Form>
  )
}

export default UserForm;
