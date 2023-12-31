import {useState, useEffect} from 'react';
import {Route, Routes, Navigate, useNavigate, useLocation} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedRouteAuth from '../ProtectedRoute/ProtectedRouteAuth';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Page404 from '../Page404/Page404';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import SideMenu from '../SideMenu/SideMenu';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';
import Profile from '../Auth/Profile/Profile';
import MainApi from '../../utils/Api/MainApi';
import AuthApi from '../../utils/Api/AuthApi';
import MoviesApi from '../../utils/Api/MoviesApi';
import {CurrentUserContext, user} from '../../contexts/CurrentUserContext';
import {useLocalStorage} from '../../hooks/useLocalStorage';
import useFilterForMovies from "../../hooks/useFilterForMovies";
import {MOVIE_BASE_URL} from '../../utils/constants';
import './App.css';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState(user.default);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isServerApplied, setIsServerApplied] = useState(false);
  const [allMovies, setAllMovies] = useLocalStorage("localMovies", []);
  const [queryAllMovies, setQueryAllMovies] = useLocalStorage("localQueryAllMovies", "");
  const [checkboxAllMovies, setCheckboxAllMovies] = useLocalStorage("localCheckboxAllMovies", false);
  const [filteredAllMovies, setFilteredAllMovies] = useFilterForMovies(allMovies, queryAllMovies, checkboxAllMovies);
  const [savedMovies, setSavedMovies] = useState([]);
  const [querySavedMovies, setQuerySavedMovies] = useState('');
  const [checkboxSavedMovies, setCheckboxSavedMovies] = useState(false)
  const [filteredSavedMovies, setFilteredSavedMovies] = useFilterForMovies(savedMovies, querySavedMovies, checkboxSavedMovies);

  const mainApi = new MainApi({
    baseUrl: 'https://api.bitfilms.veitko-se.nomoredomains.xyz',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  });

  const moviesApi = new MoviesApi({
    baseUrl: MOVIE_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const authApi = new AuthApi('https://api.bitfilms.veitko-se.nomoredomains.xyz');

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    isLoggedIn && handleLoadingData();
  }, [isLoggedIn]);

  useEffect(() => {
    isEditable && setIsServerApplied(false)
  }, [isEditable]);

  useEffect(() => {
    setIsServerApplied(false);
    setIsAuthError(false);
    setQuerySavedMovies('');
    setCheckboxSavedMovies(false);
  }, [pathname]);

  function handleTokenCheck() {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      if (token&&(token!=='undefined')) {
        setIsLoading(true);
        authApi.checkToken(token)
        .then((user) => {
          if (user) {
            setIsLoggedIn(true);
            navigate(pathname);
          }
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(()=>setIsLoading(false));
      };
    };
  };

  function handleLoadingData() {
    setIsLoading(true);
    Promise.all([
      mainApi.loadUserInfo(),
      mainApi.loadSavedMovies()
    ])
      .then(([newUserInfo, loadedMovies]) => {
        setCurrentUser(newUserInfo);
        setSavedMovies(loadedMovies);
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(()=>setIsLoading(false));
  };

  function handleBurgerMenuClick() {
    setIsMenuOpen(true);
  };

  function handleCloseMenuClick() {
    setIsMenuOpen(false);
  };

  function handleCheckboxAllMovies(inputValue) {
    if (inputValue) {
      setCheckboxAllMovies(!checkboxAllMovies);
      setQueryAllMovies(inputValue);
    }
  }

  function handleCheckboxSavedMovies(inputValue) {
    if (inputValue) {
      setCheckboxSavedMovies(!checkboxSavedMovies);
      setQuerySavedMovies(inputValue);
    }
  }

  function onFilterAllMovies(inputValue) {
    setIsLoading(true);
    moviesApi.loadAllMovies()
    .then((loadedMovies) => {
      setAllMovies(loadedMovies);
    })
    .then(() => {
      setFilteredAllMovies();
      setQueryAllMovies(inputValue);
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      setIsErrorLoading(true);
    })
    .finally(() => setIsLoading(false));
  }

  function onFilterSavedMovies(inputValue) {
    setFilteredSavedMovies(savedMovies);
    setQuerySavedMovies(inputValue);
  }

  function handleToggleLike(movie, isLiked, id) {
    isLiked ? handleRemoveMovie(id) : handleSaveMovie(movie);
  };

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
    .then((savedMovie) => {
      setSavedMovies([...savedMovies, savedMovie]);
      movie._id = savedMovie._id;
    })
    .catch((err) => {
      console.error(err);
    });
  };

  function handleRemoveMovie(movieId) {
    mainApi.deleteSavedMovie(movieId)
    .then(() => {
      setSavedMovies(savedMovies => savedMovies.filter((movie) => movie._id !== movieId));
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });
  };

  function onRegister(name, email, password) {
    setIsLoading(true);
    authApi.register(name, email, password)
    .then(() => {
      onLogin(name, email, password);
    })
    .catch(err => {
      setIsAuthError(true);
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => setIsLoading(false));;
  };

  function onLogin(name, email, password) {
    setIsLoading(true);
    authApi.authorize(email, password)
    .then((data) => {
      if (data.token){
        setIsLoggedIn(true)
        navigate('/movies', {replace: true});
        setIsAuthError(false);
      }
    })
    .catch(err => {
      setIsAuthError(true);
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => setIsLoading(false));
  };

  function onSignOut(){
    localStorage.clear();
    sessionStorage.clear();
    window.location.href="/";
    navigate('/');
    setIsLoggedIn(false);
  }

  function onEditUserInfo() {
    setIsEditable(true);
  };

  function onSaveUserInfo(name, email, password) {
    setIsLoading(true);
    mainApi.updateUserInfo({name, email})
    .then((userInfo) => {
      setCurrentUser(userInfo);
      setIsEditable(false);
      setIsAuthError(false);
      setIsServerApplied(true);
    })
    .catch(err => {
      setIsAuthError(true);
      setIsServerApplied(false);
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => setIsLoading(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <SideMenu isMenuOpen={isMenuOpen} handleCloseMenuClick={handleCloseMenuClick} />
        <Header isLoggedIn={isLoggedIn} handleBurgerMenuClick={handleBurgerMenuClick} />
        <Routes>
          <Route path="*" element={<Navigate to="/404" replace/>}/>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={
            <ProtectedRouteAuth element={Register}
              isLoggedIn={isLoggedIn}
              onRegister={onRegister}
              isServerError={isAuthError}
              isLoading={isLoading}
            />
          } />
          <Route path="/signin" element={
            <ProtectedRouteAuth element={Login}
              isLoggedIn={isLoggedIn}
              onLogin={onLogin}
              isServerError={isAuthError}
              isLoading={isLoading}
            />
          } />
          <Route path="/profile" element={
            <ProtectedRoute element={Profile}
              isLoggedIn={isLoggedIn}
              onSignOut={onSignOut}
              onEdit={onEditUserInfo}
              onSave={onSaveUserInfo}
              isEditable={isEditable}
              isServerError={isAuthError}
              isServerApplied={isServerApplied}
              isLoading={isLoading}
            />
          } />
          <Route path="/movies" element={
            <ProtectedRoute element={Movies}
              moviesBeforeFfilter={allMovies}
              moviesAfterFilter={filteredAllMovies}
              savedMovies={savedMovies}
              searchText={queryAllMovies}
              isShortFilm={checkboxAllMovies}
              onFilter={onFilterAllMovies}
              onCheckBox={handleCheckboxAllMovies}
              onCardLike={handleToggleLike}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              isErrorLoading={isErrorLoading}
            />
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute element={SavedMovies}
              moviesBeforeFfilter={savedMovies}
              moviesAfterFilter={filteredSavedMovies}
              searchText={querySavedMovies}
              isShortFilm={checkboxSavedMovies}
              onFilter={onFilterSavedMovies}
              onCheckBox={handleCheckboxSavedMovies}
              onRemoveMovie={handleRemoveMovie}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              isErrorLoading={isErrorLoading}
            />
          } />
          <Route path="/404" element={<Page404 />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
