import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  return (
    <ul className="movies-cardlist" aria-label="Фильмы">
      {movies.map((movie) => {
        return (
          <MoviesCard movie={movie} key={movie.id} />
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
