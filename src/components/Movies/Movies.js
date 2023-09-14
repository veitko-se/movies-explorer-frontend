import {useState, useEffect} from 'react';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import {useResize} from '../../hooks/useResize';
import getMoviesToShowCounter from "../../utils/moviesCounter";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import "./Movies.css";

function Movies({ onCardLike, moviesForRender, savedMovies, searchText, isShortFilm, isLoading, isErrorLoading, onCheckBox, onFilter }) {
  const { values, errors, isValid, handleChange, setValues } = useFormAndValidation();
  const {width} = useResize();
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [moviesToShowCounter, setMoviesToShowCounter] = useState(() => getMoviesToShowCounter(width));
  const [next, setNext] = useState(moviesToShowCounter.initial);

  useEffect(() => {
    setValues({search: searchText});
  }, []);

  useEffect(() => {
    renderMovies();
  }, [moviesForRender, moviesToShowCounter]);

  useEffect(() => {
    const moviesToShowCounter = getMoviesToShowCounter(width);
    setMoviesToShowCounter(moviesToShowCounter);
    setNext(moviesToShowCounter.initial);
  }, [width]);

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    onFilter(values.search);
  };

  function handleIsShortFilmCheckbox() {
    onCheckBox(values.search)
  }

  function handleBtnMoreClick() {
    const nextCounter = next + moviesToShowCounter.add;
    addMovies(next, nextCounter);
    setNext(nextCounter);
  };

  function renderMovies() {
    const slicedMovies = moviesForRender.slice(0, moviesToShowCounter.initial);
    setMoviesToShow(slicedMovies);
  };

  function addMovies(start, end) {
    const slicedMovies = moviesForRender.slice(start, end);
    const newMoviesToShow = [...moviesToShow, ...slicedMovies];
    setMoviesToShow(newMoviesToShow);
  };

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
        : (localStorage.getItem('localMovies') === null)
        ? <p className="movies__message">
            Для поиска нужно ввести ключевое слово
          </p>
        : (moviesForRender.length > 0)
        ? <>
            <MoviesCardList movies={moviesToShow} savedMovies={savedMovies} onCardLike={onCardLike}/>
            {moviesForRender.length > moviesToShow.length && <button className="button movies__btn" type="button" onClick={handleBtnMoreClick}>Ещё</button>}
          </>
        : <p className="movies__message">
            Ничего не найдено
          </p>
      }
    </main>
  );
}

export default Movies;
