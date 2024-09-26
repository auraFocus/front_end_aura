import React, { useState } from 'react';
import '../styles/sidebar.css'; 
import { FaBars } from 'react-icons/fa'; 

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
          <li><a className="links_sidebar" href="/">Home</a></li>
          <li><a className="links_sidebar" href="/about">About</a></li>
          <li><a className="links_sidebar" href="/services">Services</a></li>
          <li><a className="links_sidebar" href="/contact">Contact</a></li>
        </ul>
      </div>
      
    
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
