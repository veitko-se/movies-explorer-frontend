import {useState, useEffect} from 'react';
import './App.css';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Menu from '../Menu/Menu';

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
      <Menu isMenuOpen={isMenuOpen} handleCloseMenuClick={handleCloseMenuClick}/>
      <Header loggedIn={loggedIn} handleBurgerMenuClick={handleBurgerMenuClick} />
      <Routes>
        <Route path="*" element={<Navigate to="/signin"/>}/>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
