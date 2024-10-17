import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoginPage from './pages/login_page';
import Dashboard from './pages/dashboard';
import StudentsPage from './pages/students';
import Teachers from './pages/Teachers';
import UsersB2BPage from './pages/users_b2b';
import TokenExpiredModal from './components/modal_auth';
import './styles/app.css';
import ChatGPT from './pages/chatGPT';

function App() {
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            setIsTokenExpired(true); 
          }
        } catch (error) {
          console.error('Erro ao decodificar o token:', error);
        }
      }
    };

    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleModalClose = () => {
    setIsTokenExpired(false);  // Atualiza o estado para fechar o modal
  };

  return (
    <>
      <Router>
        <div className='app_div'>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/students_page' element={<StudentsPage />} />
            <Route path='/teachers_page' element={<Teachers />} />
            <Route path='/parents_page' element={<Teachers />} />
            <Route path='/users_b2b_page' element={<UsersB2BPage />} />
            <Route path='/chat_aura' element={<ChatGPT />} />
          </Routes>
        </div>
       
        <TokenExpiredModal isOpen={isTokenExpired} onClose={handleModalClose} />
      </Router>
    </>
  );
}

export default App;
