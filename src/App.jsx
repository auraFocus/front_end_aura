import { useState } from 'react'
import LoginPage from './pages/login_page'
import './styles/app.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import StudentsPage from './pages/students';

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <div className='app_div'>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/students_page' element={<StudentsPage/>}/>
      </Routes>

       

      </div>

    </Router>
  )
}

export default App
