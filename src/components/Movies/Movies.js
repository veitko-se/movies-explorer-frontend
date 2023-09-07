import { useState } from 'react';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import initialMovies from "../../utils/initialMovies";
import "./Movies.css";

function Movies() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="movies">
      <SearchForm />
      {isLoading
        ? <Preloader />
        : <>
            <MoviesCardList movies={initialMovies} />
            <button className="button movies__btn" type="button">Ещё</button>
          </>
      }
    </main>
  );
}

export default Movies;
