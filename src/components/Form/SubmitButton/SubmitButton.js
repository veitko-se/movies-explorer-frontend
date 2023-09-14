import './SubmitButton.css';

function SubmitButton({ children, isValid, isVisible = true, formName, isServerError}) {
  return (
    <div className="button-block">
      { isServerError && <p className="button-block__error">
        Произошла ошибка сервера.
      </p> }
      <button
        type="submit"
        className={`button form__submit form__submit_type_${formName} ${!isVisible && 'form__submit_unvisible'} ${!isValid && 'form__submit_disabled'}`}
        disabled={!isValid ? '+true' : ''}>
        {children}
      </button>
    </div>
  )
}

export default SubmitButton;
