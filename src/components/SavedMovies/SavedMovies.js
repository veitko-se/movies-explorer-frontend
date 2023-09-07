import { useState } from 'react';
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import initialMovies from "../../utils/initialMovies";
import "./SavedMovies.css";

function SavedMovies() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="movies">
      <SearchForm />
      {isLoading
        ? <Preloader />
        : <MoviesCardList movies={initialMovies} />
      }
    </main>
  );
}

export default SavedMovies;
