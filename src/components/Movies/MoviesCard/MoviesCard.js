import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { MOVIE_BASE_URL } from '../../../utils/constants';
import minutesToHours from '../../../utils/minutesToHours';

function MoviesCard({ movie }) {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    //onCardLike(card);
    setIsLiked(!isLiked);
  }

  // function handleCardLike(card) {
  //   const isLiked = card.likes.some(i => i._id === currentUser._id);
  //   api.changeLikeCardStatus(card._id, !isLiked)
  //   .then((newCard) => {
  //     setCards(cardsCopy => cardsCopy.map(
  //       cardCopy => cardCopy._id === card._id ? newCard : cardCopy
  //     ));
  //   })
  //   .catch(err => console.log(`Ошибка: ${err}`));
  // };

  // function handleAddPlaceSubmit(newCard) {
  //   api.pushCard(newCard)
  //   .then((newCard) => {
  //     setCards([newCard, ...cards]);
  //     closeAllPopups();
  //   })
  //   .catch(err => console.log(`Ошибка: ${err}`));
  // };

  return (
    <li className="movies-card">
      <a href={movie.trailerLink} className="movies-card__link link" target="_blank" rel="noopener noreferrer">
        <img className="movies-card__image" src={movie.image.url && MOVIE_BASE_URL + movie.image.url} alt={movie.nameRU} />
      </a>
      <div className="movies-card__footer">
        <div className="movies-card__text-block">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__duration">{minutesToHours(movie.duration)}</p>
        </div>
        {pathname === "/movies" &&
          <button onClick={handleLikeClick} className={`movies-card__btn ${isLiked && "movies-card__btn_type_active"} button`} type="button" />
        }
        {pathname === "/saved-movies" &&
          <button className="movies-card__btn movies-card__btn_type_delete button" type="button" />
        }
      </div>
    </li>
  );
}

export default MoviesCard;
