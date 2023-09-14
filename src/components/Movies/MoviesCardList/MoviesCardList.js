import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, savedMovies, onCardLike, onCardRemove }) {
  return (
    <ul className="movies-cardlist" aria-label="Фильмы">
      {movies.map((movie) => {
        return (
          <MoviesCard key={movie.id || movie._id} movie={movie} savedMovies={savedMovies} onCardLike={onCardLike} onCardRemove={onCardRemove}/>
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
