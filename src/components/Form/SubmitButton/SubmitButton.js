import { useLocation } from "react-router-dom";
import './SubmitButton.css';

function SubmitButton({ children, isValid, isVisible = true, formName, isServerError, isServerApplied}) {
  const { pathname } = useLocation();
  return (
    <div className="button-block">
      { isServerError && <p className="button-block__error">
        Произошла ошибка сервера.
      </p> }
      { isServerApplied && pathname==='/profile' && <p className="button-block__message">
        Информация успешно обновлена!
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
