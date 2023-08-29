import './Promo.css';
import promoLogo from '../../../images/promo-logo.svg';

function Promo() {
  return (
    <section className="promo-cover">
      <div className="promo landing__element">
        <div className="promo__text-block">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a href="#about-project" className="promo__link link">Узнать больше</a>
        </div>
        <img src={promoLogo} alt="Иллюстрация" className="promo__logo"/>
      </div>
    </section>
  )
}

export default Promo;
