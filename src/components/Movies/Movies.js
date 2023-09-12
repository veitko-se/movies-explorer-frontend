import {useState, useEffect} from 'react';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import "./Movies.css";
import moviesApi from '../../utils/Api/moviesApi';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import {useLocalStorage} from '../../hooks/useLocalStorage';
import {useResize} from '../../hooks/useResize';
import getMoviesToShowCounter from "../../utils/moviesCounter";
import getFilteredMovies from "../../utils/searchUtils";

function Movies({onCardLike}) {
  const {values, errors, isValid, handleChange, setValues} = useFormAndValidation();
  const [movies, setMovies] = useState(getFilteredMovies);
  const [isShortFilm, setIsShortFilm] = useLocalStorage("localIsShortFilm", false);
  const [searchText, setSearchText] = useLocalStorage("localSearchText", "");
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const {width} = useResize();
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [moviesToShowCounter, setMoviesToShowCounter] = useState(() => getMoviesToShowCounter(width));
  const [next, setNext] = useState(moviesToShowCounter.initial);

  useEffect(() => {
    setValues({search: searchText});
  }, []);

  useEffect(() => {
    setFilteredMovies();
  }, [isShortFilm, searchText]);

  useEffect(() => {
    renderMovies();
  }, [movies, moviesToShowCounter]);

  useEffect(() => {
    const moviesToShowCounter = getMoviesToShowCounter(width);
    setMoviesToShowCounter(moviesToShowCounter);
    setNext(moviesToShowCounter.initial);
  }, [width]);

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    moviesApi.loadAllMovies()
      .then((loadedMovies) => {
        localStorage.setItem('localMovies', JSON.stringify(loadedMovies));
        setSearchText(values.search);
        setFilteredMovies();
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
        setIsErrorLoading(true);
      })
      .finally(() => setIsLoading(false));
  };

  function handleIsShortFilmCheckbox() {
    if (values.search) {
      setIsShortFilm(!isShortFilm);
      setSearchText(values.search);
    }
  }

  function handleBtnMoreClick() {
    const nextCounter = next + moviesToShowCounter.add;
    addMovies(next, nextCounter);
    setNext(nextCounter);
  };

  function setFilteredMovies() {
    const filteredMovies = getFilteredMovies(searchText, isShortFilm)
    setMovies(filteredMovies);
  }

  function renderMovies() {
    const slicedMovies = movies.slice(0, moviesToShowCounter.initial);
    setMoviesToShow(slicedMovies);
  };

  function addMovies(start, end) {
    const slicedMovies = movies.slice(start, end);
    const newMoviesToShow = [...moviesToShow, ...slicedMovies];
    setMoviesToShow(newMoviesToShow);
  };

  return (
    <main className="movies">
      <SearchForm
        handleSubmit={handleSearchSubmit} handleIsShortFilmCheckbox={handleIsShortFilmCheckbox}
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
        : (movies.length > 0)
        ? <>
            <MoviesCardList movies={moviesToShow} onCardLike={onCardLike}/>
            {movies.length > moviesToShow.length && <button className="button movies__btn" type="button" onClick={handleBtnMoreClick}>Ещё</button>}
          </>
        : <p className="movies__message">
            Ничего не найдено
          </p>
      }
    </main>
  );
}

export default Movies;
