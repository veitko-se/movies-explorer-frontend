import {useState, useEffect} from 'react';
import './App.css';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';
import Profile from '../Profile/Profile';
import SideMenu from '../SideMenu/SideMenu';
import Page404 from '../Page404/Page404';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleBurgerMenuClick() {
    setIsMenuOpen(true);
  };

  function handleCloseMenuClick() {
    setIsMenuOpen(false);
  };

  return (
    <div className="page">
      <SideMenu isMenuOpen={isMenuOpen} handleCloseMenuClick={handleCloseMenuClick}/>
      <Header loggedIn={loggedIn} handleBurgerMenuClick={handleBurgerMenuClick} />
      <Routes>
        <Route path="*" element={<Navigate to="/404" replace/>}/>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/404" element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
