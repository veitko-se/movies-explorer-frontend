import {useState, useEffect} from 'react';
import {SHORT_FILM_DURATION} from '../utils/constants';

function useFilterForMovies(unfilteredMovies, searchText, isShortFilm) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setFilteredMovies();
  }, [unfilteredMovies, isShortFilm, searchText]);

  const filterBySearchText = (movie) => {
    const normalizedText = searchText.toLowerCase();
    const movieNames = [movie.nameEN, movie.nameRU].map(v => v.toLowerCase());
    return movieNames.some(v => v.includes(normalizedText));
  }

  const filterByCheckbox = (movie) => {
    return isShortFilm ? movie.duration <= SHORT_FILM_DURATION : true;
  }

  function getFilteredMovies(unfilteredMovies, ...filters) {
    const movies = unfilteredMovies || [];
    return movies.filter(movie => filters.every(filter => filter(movie)));
  }

  function setFilteredMovies() {
    const filteredMovies = getFilteredMovies(unfilteredMovies, filterBySearchText, filterByCheckbox)
    setMovies(filteredMovies);
  }

  return  [ movies, setFilteredMovies ];
}

export default useFilterForMovies;
