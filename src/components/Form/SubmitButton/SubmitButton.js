import './SubmitButton.css';

function SubmitButton({ children, isValid, isVisible = true, formName}) {
  return (
    <button
      type="submit"
      className={`button form__submit form__submit_type_${formName} ${!isVisible && 'form__submit_unvisible'} ${!isValid && 'form__submit_disabled'}`}
      disabled={!isValid ? '+true' : ''}>
      {children}
    </button>
  )
}

export default SubmitButton;
