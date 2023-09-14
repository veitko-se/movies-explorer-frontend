import { useEffect } from 'react';
import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import useFormAndValidation from '../../hooks/useFormAndValidation';
import "./SavedMovies.css";

function SavedMovies({onRemoveMovie, onCheckBox, onFilter, searchText, isShortFilm, isLoading, isErrorLoading, moviesAfterFilter, moviesBeforeFfilter}) {
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
      { isLoading
        ? <Preloader />
        : isErrorLoading
        ? <p className="movies__message">
            Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
          </p>
        : (moviesAfterFilter.length > 0)
        ? <MoviesCardList movies={moviesAfterFilter} onCardRemove={onRemoveMovie} savedMovies={moviesBeforeFfilter} />
        : <p className="movies__message">
            Ничего не найдено
          </p>
      }
    </main>
  );
}

export default SavedMovies;
