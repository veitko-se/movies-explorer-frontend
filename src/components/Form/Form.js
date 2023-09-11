import { Children } from 'react';
import SubmitButton from './SubmitButton/SubmitButton';
import './Form.css';

function Form({ formName, title, children, errors, isValid, isButtonVisible = true, buttonText, handleSubmit }) {
  return (
    <>
      <h1 className={`form-title form-title_type_${formName}`}>{title}</h1>
      <form className={`form form_type_${formName}`} onSubmit={handleSubmit} noValidate>
        <div className={`form__input-block form__input-block_type_${formName}`}>

          {Children.map(children, child => {
            if (child) {
              const inputName = child.props.name;
              const inputTitle = child.props.title;
              return (

                <label key={inputName} className={`form__field form__field_type_${formName}`}>
                  {inputTitle}
                  {child}
                  <span
                    className={`form__error form__error_type_${formName} ${!isValid && 'form__error_visible'}`}
                    id={`input-${inputName}-error`}
                    // name={inputName}
                  >{errors[inputName]}
                  </span>
                </label>

              )
            }
          })}

        </div>
        <SubmitButton isValid={isValid} isVisible={isButtonVisible} formName={formName}>{buttonText}</SubmitButton>
      </form>
    </>
  )
}

export default Form;
