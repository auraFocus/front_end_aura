import { useState } from 'react'
import LoginPage from './pages/login_page'
import './styles/app.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app_div'>

      <LoginPage/>

    </div>
  )
}

export default App
