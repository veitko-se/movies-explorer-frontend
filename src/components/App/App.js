import {useState, useEffect} from 'react';
import './App.css';
import {Route, Routes, Navigate, useNavigate, useLocation} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Page404 from '../Page404/Page404';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import SideMenu from '../Menu/SideMenu/SideMenu';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';
import Profile from '../Auth/Profile/Profile';
import MainApi from '../../utils/Api/MainApi';
import AuthApi from '../../utils/Api/AuthApi';
import {CurrentUserContext, user} from '../../contexts/CurrentUserContext';
import {useLocalStorage} from '../../hooks/useLocalStorage';
import useFilterForMovies from "../../hooks/useFilterForMovies";
import useFilterForSavedMovies from "../../hooks/useFilterForMovies";
import MoviesApi from '../../utils/Api/MoviesApi';
import { MOVIE_BASE_URL } from '../../utils/constants';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token')||"" ? true : false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user.default);
  const [isEditable, setIsEditable] = useState(false);
  const [querySavedMovies, setQuerySavedMovies] = useLocalStorage("localQuerySavedMovies", "");
  const [checkboxSavedMovies, setCheckboxSavedMovies] = useLocalStorage("localCheckboxSavedMovies", false)
  const [checkboxAllMovies, setCheckboxAllMovies] = useLocalStorage("localCheckboxAllMovies", false);
  const [queryAllMovies, setQueryAllMovies] = useLocalStorage("localQueryAllMovies", "");
  const [allMovies, setAllMovies] = useLocalStorage("localMovies", []);
  const [movies, setMovies] = useFilterForSavedMovies(allMovies, queryAllMovies, checkboxAllMovies);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useFilterForSavedMovies(savedMovies, querySavedMovies, checkboxSavedMovies);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
    if (isLoggedIn) {
      handleLoadingData()
    } else {
      handleTokenCheck()
    }
  }, [isLoggedIn, pathname]);

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
      setMovies();
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
    authApi.register(name, email, password)
    .then(() => {
      onLogin(name, email, password);
      setIsRegisterError(false);
    })
    .catch(err => {
      setIsRegisterError(true);
      console.log(`Ошибка: ${err}`);
    });
  };

  function onLogin(name, email, password) {
    authApi.authorize(email, password)
    .then((data) => {
      if (data.token){
        setIsLoggedIn(true)
        navigate('/movies', {replace: true});
      }
    })
    .catch(err => {
      setIsRegisterError(true);
      console.log(`Ошибка: ${err}`);
    })
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
    mainApi.updateUserInfo({name, email})
    .then((userInfo) => {
      setCurrentUser(userInfo);
      setIsEditable(false);
    })
    .catch(err => console.log(`Ошибка: ${err}`));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <SideMenu isMenuOpen={isMenuOpen} handleCloseMenuClick={handleCloseMenuClick} />
        <Header isLoggedIn={isLoggedIn} handleBurgerMenuClick={handleBurgerMenuClick} />
        <Routes>
          <Route path="*" element={<Navigate to="/404" replace/>}/>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register onRegister={onRegister} />} />
          <Route path="/signin" element={<Login onLogin={onLogin} />} />
          <Route path="/profile" element={
            <ProtectedRoute element={Profile} isLoggedIn={isLoggedIn}
            onSignOut={onSignOut} onEdit={onEditUserInfo} onSave={onSaveUserInfo} isEditable={isEditable} />
          } />
          <Route path="/movies" element={
            <ProtectedRoute element={Movies}
              moviesForRender={movies}
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
              moviesForRender={filteredSavedMovies}
              savedMovies={savedMovies}
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
