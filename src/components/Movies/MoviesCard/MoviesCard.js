import { useLocation } from "react-router-dom";
import {useState} from 'react';
import { MOVIE_BASE_URL } from '../../../utils/constants';
import minutesToHours from '../../../utils/minutesToHours';
import "./MoviesCard.css";

function MoviesCard({ movie, savedMovies, onCardLike, onCardRemove }) {
  const [isLiked, setIsLiked] = useState( savedMovies ? savedMovies.some((i) => i.movieId === movie.id) : false);
  const { pathname } = useLocation();

  const likedMovie = savedMovies
  ? savedMovies.find((item) => item.movieId === movie.id)
  : '';

  function handleLikeClick() {
    onCardLike(movie, isLiked, likedMovie?._id);
    setIsLiked(!isLiked);
  }

  function handleRemoveClick() {
    onCardRemove(movie._id);
  }

  return (
    <li className="movies-card">
      <a href={movie.trailerLink} className="movies-card__link link" target="_blank" rel="noopener noreferrer">
        <img className="movies-card__image" src={movie.image.url ? MOVIE_BASE_URL + movie.image.url : movie.image} alt={movie.nameRU} />
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
          <button onClick={handleRemoveClick} className="movies-card__btn movies-card__btn_type_delete button" type="button" />
        }
      </div>
    </li>
  );
}

export default MoviesCard;
