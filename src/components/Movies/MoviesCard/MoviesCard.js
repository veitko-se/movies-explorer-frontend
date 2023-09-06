import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function MoviesCard({ movie }) {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  const saveMovie = () => {
    setIsLiked(!isLiked);
  };

  return (
    <article className="movies-card">
      <img className="movies-card__image" src={movie.thumbnail} alt={movie.nameRU} />
      <div className="movies-card__footer">
        <div className="movies-card__text-block">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__duration">1ч42м{/*movie.duration*/}</p>
        </div>
        {pathname === "/movies" &&
          <button onClick={saveMovie} className={`movies-card__btn ${isLiked && "movies-card__btn_type_active"} button`} />
        }
        {pathname === "/saved-movies" &&
          <button className="movies-card__btn movies-card__btn_type_delete button" />
        }
      </div>
    </article>
  );
}

export default MoviesCard;
