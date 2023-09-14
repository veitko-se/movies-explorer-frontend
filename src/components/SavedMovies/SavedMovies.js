import { useEffect } from 'react';
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import useFormAndValidation from '../../hooks/useFormAndValidation';
import "./SavedMovies.css";

function SavedMovies({onRemoveMovie, onCheckBox, onFilter, savedMovies, searchText, isShortFilm, isLoading, moviesForRender}) {
  const {values, errors, isValid, handleChange, setValues} = useFormAndValidation();

  useEffect(() => {
    setValues({search: searchText});
  }, []);

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    onFilter(values.search);
  };

  function handleIsShortFilmCheckbox() {
    onCheckBox(values.search)
  }

  return (
    <main className="movies">
      <SearchForm
        handleSubmit={handleSearchSubmit} onCheckBox={handleIsShortFilmCheckbox}
        values={values} errors={errors} isValid={isValid} handleChange={handleChange}
        searchText={searchText} isShortFilm={isShortFilm}
      />
      {isLoading
        ? <Preloader />
        : <MoviesCardList movies={moviesForRender} onCardRemove={onRemoveMovie} savedMovies={savedMovies} />
      }
    </main>
  );
}

export default SavedMovies;
