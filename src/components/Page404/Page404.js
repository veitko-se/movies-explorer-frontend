import './Page404.css';
import { useNavigate } from 'react-router-dom';

function Page404() {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1, {replace: true});
  };

  return (
    <section className="page404">
      <div className="page404__text-block">
        <h2 className="page404__title">404</h2>
        <p className="page404__text">Страница не найдена</p>
      </div>
      <button className="page404__back-btn button" onClick={handleBackButtonClick}>Назад</button>
    </section>
  )
}

export default Page404;
