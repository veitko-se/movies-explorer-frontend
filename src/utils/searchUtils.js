function Movies() {
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

  function checkLoadStatus(movies) {
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
      const moviesFiltered = getFilteredElements(localMovies)
      setMovies(moviesFiltered);
      checkLoadStatus(moviesFiltered);
    }
  }
}
