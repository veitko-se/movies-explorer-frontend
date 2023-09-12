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
import mainApi from '../../utils/Api/mainApi';
import authApi from '../../utils/Api/authApi';
import {CurrentUserContext, user} from '../../contexts/CurrentUserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user.default);
  const [isEditable, setIsEditable] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      if (token&&(token!=='undefined')) {
        Promise.all([mainApi.loadUserInfo(), authApi.checkToken(token)])
        .then(([newUserInfo, data]) => {
          setCurrentUser(newUserInfo);
          setIsLoggedIn(true);
          navigate(pathname);
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(()=>setIsLoading(false));
      };
    };
  }, []);

  function handleBurgerMenuClick() {
    setIsMenuOpen(true);
  };

  function handleCloseMenuClick() {
    setIsMenuOpen(false);
  };

  function handleToggleLike(movie, isLiked) {
    if (isLiked) { handleRemoveMovie(movie.id) }
    else { handleSaveMovie(movie) }
  };

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
    .catch((err) => {
      console.error(err);
    });
  };

  function handleRemoveMovie(movieId) {
    mainApi.deleteMovie(movieId)
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });
  };

  function onRegister(name, email, password) {
    authApi.register(name, email, password)
    .then(() => {
      onLogin(name, email, password)
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

  // function onAccount() {
  //   mainApi.loadUserInfo()
  //   .then(newUserInfo => setCurrentUser(newUserInfo))
  //   .catch(err => console.log(`Ошибка: ${err}`))
  // };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <SideMenu isMenuOpen={isMenuOpen} handleCloseMenuClick={handleCloseMenuClick} /*onAccount={onAccount}*/ />
        <Header isLoggedIn={isLoggedIn} handleBurgerMenuClick={handleBurgerMenuClick} /*onAccount={onAccount}*/ />
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
            <ProtectedRoute element={Movies} isLoggedIn={isLoggedIn}
            onCardLike={handleToggleLike} />
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn}/>
          } />
          <Route path="/404" element={<Page404 />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
