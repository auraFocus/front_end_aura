import React, { useState, useEffect } from 'react';
import '../styles/sidebar.css'; 
import { FaBars } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from '../../public/assets/logo_sidebar.jpg'
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const rolesBlocked = ['b2b_admin','student'];

  useEffect(() => {
    const token = localStorage.getItem('token');

    const decodedToken = jwtDecode(token);

    const role = decodedToken.role;

    setUserRole(role);
    
  
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="hamburger-button" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>

      <div className="logo_sidebar_container">
                <img className='logo_sidebar_img' src={logo} alt="AuraFocus Logo" />
            </div>

        <ul>
          <li><Link className="links_sidebar" to="/dashboard">Início</Link></li>

          { userRole !== 'student' && ( <>
          <li><Link className="links_sidebar" to="/students_page">Estudantes</Link></li>
          <li><Link className="links_sidebar" to="/teachers_page">Professores</Link></li>
          <li><Link className="links_sidebar" to="/parents_page">Pais</Link></li>  
          
          </>
          )
          }
          
          {!rolesBlocked.includes(userRole) && (
            <li><Link className='links_sidebar' to="/users_b2b_page">Administradores</Link></li>
          )}

          {userRole === 'student' && (
            <li><Link className='links_sidebar' to="/chat_aura">Aura</Link></li>
          )}
        </ul>
      </div>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
