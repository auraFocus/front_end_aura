import React, { useState } from 'react';
import '../styles/sidebar.css'; 
import { FaBars } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
     
      <button className="hamburger-button" onClick={toggleSidebar}>
        <FaBars />
      </button>

  
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
        <li><Link className="links_sidebar" to="/dashboard">Início</Link></li>
        <li><Link className="links_sidebar" to="/students_page">Estudantes</Link></li>
        <li><Link className="links_sidebar" to="/teachers_page">Professores</Link></li>
        <li><Link className="links_sidebar" to="/parents_page">Pais</Link></li>  
        <li><Link className='links_sidebar' to="/users_b2b_page">Administradores</Link></li>
        </ul>
      </div>
      
    
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
