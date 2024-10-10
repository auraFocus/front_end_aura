import { useState } from 'react'
import LoginPage from './pages/login_page'
import './styles/app.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import StudentsPage from './pages/students';
import Teachers from './pages/Teachers';
import UsersB2BPage from './pages/users_b2b';

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <div className='app_div'>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/students_page' element={<StudentsPage/>}/>
        <Route path='/teachers_page' element={<Teachers/>}/>
        <Route path='/parents_page' element={<Teachers/>}/>
        <Route path='/users_b2b_page' element={<UsersB2BPage/>}/>
      </Routes>

       

      </div>

    </Router>
  )
}

export default App
