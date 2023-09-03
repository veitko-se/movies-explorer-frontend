import { useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Form from '../Form/Form';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import './UserForm.css';


function UserForm({ formName, title, isButtonVisible = true, buttonText }) {
  const { pathname } = useLocation();
  const { values, errors, isValid, handleChange } = useFormAndValidation();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isButtonVisible]);

  return (
    <Form
      formName={formName}
      title={title} buttonText={buttonText}
      isButtonVisible={isButtonVisible}
      values={values} errors={errors} isValid={isValid} handleChange={handleChange}
    >
      { !(pathname==='/signin') &&
        <input
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
          disabled={!isButtonVisible}
          ref={inputRef}
        />
      }

        <input
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
          disabled={!isButtonVisible}
        />

      { !(pathname==='/profile') &&
        <input
          aria-label="Пароль"
          type="password"
          className={`form__input form__input_type_${formName} ${errors.password&&'form__input_type_error'}`}
          id="input-password"
          placeholder="Пароль"
          required
          name="password"
          minLength="2"
          maxLength="40"
          value={values.password||''}
          onChange={handleChange}
        />
      }
    </Form>
  )
}

export default UserForm;
