import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  return (
    <section className="movies-cardlist" aria-label="Фильмы">
      {movies.map((movie) => {
        return (
          <MoviesCard movie={movie} key={movie.movieId} />
        );
      })}
    </section>
  );
}

export default MoviesCardList;
