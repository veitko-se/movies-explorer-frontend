export default function getFilteredMovies(searchText, isShortFilm ) {

  const filterBySearchText = (movie) => {
    const normalizedText = searchText.toLowerCase();
    const movieNames = [movie.nameEN, movie.nameRU].map(v => v.toLowerCase());
    return movieNames.some(v => v.includes(normalizedText));
  }

  const filterByCheckbox = (movie) => {
    return isShortFilm ? movie.duration <= 40 : true;
  }

  function filterMovies(...filters) {
    const localMovies = localStorage.getItem('localMovies') || "[]";
    const movies = JSON.parse(localMovies);
    return movies.filter(v => filters.every(f => f(v)));
  }

  const filteredMovies = filterMovies(filterBySearchText, filterByCheckbox);

  return filteredMovies;
}
