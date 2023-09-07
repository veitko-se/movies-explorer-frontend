import './Page404.css';
import { useNavigate } from 'react-router-dom';

function Page404() {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1, {replace: true});
  };

  return (
    <main className="page404">
      <div className="page404__text-block">
        <h1 className="page404__title">404</h1>
        <p className="page404__text">Страница не найдена</p>
      </div>
      <button className="page404__back-btn button" onClick={handleBackButtonClick} type="button">Назад</button>
    </main>
  )
}

export default Page404;
