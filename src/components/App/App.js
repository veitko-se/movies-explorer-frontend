import {useState, useEffect} from 'react';
import './App.css';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/signin"/>}/>
        <Route path="/" element={
          <Main loggedIn={loggedIn}/>
        } />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
