import './SubmitButton.css';

function SubmitButton({ children, isValid, isVisible = true}) {
  return (
    <button
      type="submit"
      className={`button form__submit ${!isVisible && 'form__submit_unvisible'} ${!isValid && 'form__submit_disabled'}`}
      disabled={!isValid ? '+true' : ''}>
      {children}
    </button>
  )
}

export default SubmitButton;
