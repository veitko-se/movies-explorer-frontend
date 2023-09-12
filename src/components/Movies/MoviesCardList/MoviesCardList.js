import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onCardLike }) {
  return (
    <ul className="movies-cardlist" aria-label="Фильмы">
      {movies.map((movie) => {
        return (
          <MoviesCard key={movie.id} movie={movie} onCardLike={onCardLike} />
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
