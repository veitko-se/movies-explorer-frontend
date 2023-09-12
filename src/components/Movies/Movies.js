import { useState, useEffect, useMemo, useCallback } from 'react';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import "./Movies.css";
import moviesApi from '../../utils/Api/moviesApi';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import {useLocalStorage} from '../../hooks/useLocalStorage';
import {useResize} from '../../hooks/useResize';

function Movies({onCardLike}) {
  const { values, errors, isValid, handleChange } = useFormAndValidation();
  const [isShortFilm, setIsShortFilm] = useLocalStorage("localIsShortFilm", false);
  const [searchText, setSearchText] = useLocalStorage("localSearchText", "");
  const [movies, setMovies] = useState([]);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const [isNoResult, setIsNoResult] = useState(false);
  const [isLoadOk, setIsLoadOk] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { width, isLess630, isMore630, isMore930, isMore1280 } = useResize();

  useEffect(() => {
    setFilterForMovies();
  }, [isShortFilm, searchText]);

  useEffect(() => {
    values.search=searchText;
    setFilterForMovies();
  }, []);

  useEffect(() => {
    checkLoadStatus();
    renderMovies();
  }, [movies, isLess630, isMore630, isMore930, isMore1280]);


  function handleSearchSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    moviesApi.loadAllMovies()
    .then((loadedMovies) => {
      localStorage.setItem('localMovies', JSON.stringify(loadedMovies));
      setSearchText(values.search);
      setFilterForMovies();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      setIsErrorLoading(true);
    })
    .finally(()=>setIsLoading(false));
  }

  function handleIsShortFilmCheckbox() {
    if (values.search) {
      setIsShortFilm(!isShortFilm);
      setSearchText(values.search);
    }
  }




//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function filterByInput(searchText, movies) {
    return movies.filter(movie =>
      movie.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  function filterByCheckbox(isShort, movies) {
    if (isShort) {
      return movies.filter(movie =>
        movie.duration <= 40
      );
    } return movies;
  }

  function checkLoadStatus() {
    if (movies.length > 0) {
      setIsLoadOk(true); setIsNoResult(false)
    } else {
      setIsLoadOk(false); setIsNoResult(true)
    }
  }

  function getFilteredElements(data) {
      let moviesFiltered = JSON.parse(data);
      moviesFiltered = filterByCheckbox(isShortFilm, moviesFiltered);
      moviesFiltered = filterByInput(searchText, moviesFiltered);
      return moviesFiltered;
  }

  function setFilterForMovies() {
    const localMovies = localStorage.getItem('localMovies');
    if (localMovies) {
      const moviesFiltered = getFilteredElements(localMovies);
      setMovies(moviesFiltered);
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////




let moviesToShowCounter;
let moviesToAddCounter;
if (isMore1280) {moviesToShowCounter = 16; moviesToAddCounter = 4};
if (!isMore1280 && isMore930) {moviesToShowCounter = 12; moviesToAddCounter = 3};
if (!isMore1280 && !isMore930 && isMore630) {moviesToShowCounter = 8; moviesToAddCounter = 2};
if (isLess630) {moviesToShowCounter = 5; moviesToAddCounter = 2};


const [moviesToShow, setMoviesToShow] = useState([]);
const [next, setNext] = useState(moviesToShowCounter);

function renderMovies() {
  const slicedMovies = movies.slice(0, moviesToShowCounter);
  setMoviesToShow(slicedMovies);
};

function addMovies(start, end) {
  const slicedMovies = movies.slice(start, end);
  let newMoviesToShow = [...moviesToShow, ...slicedMovies];
  setMoviesToShow(newMoviesToShow);
};

function handleBtnMoreClick() {
  addMovies(next, next + moviesToAddCounter);
  setNext(next + moviesToAddCounter);
  //console.log(next, moviesToAddCounter, moviesToShowCounter)
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
        : isNoResult
        ? <p className="movies__message">
            Ничего не найдено
          </p>
        : isLoadOk
        ? <>
            <MoviesCardList movies={moviesToShow} onCardLike={onCardLike} />
            {movies.length > moviesToShow.length && <button className="button movies__btn" type="button" onClick={handleBtnMoreClick}>Ещё</button>}
          </>
        : <p className="movies__message">
            Для поиска нужно ввести ключевое слово
          </p>
      }
    </main>
  );
}

export default Movies;
