import { useLocation } from "react-router-dom";
import './SubmitButton.css';

function SubmitButton({ children, isValid, isVisible = true, formName, isServerError, isServerApplied}) {
  const { pathname } = useLocation();
  return (
    <div className="button-block">
      { isServerError && <p className="button-block__message button-block__message_type_error">
        Произошла ошибка. Проверьте введенные данные или попробуйте позже.
      </p> }
      { isServerApplied && pathname==='/profile' && <p className="button-block__message button-block__message_type_ok">
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
