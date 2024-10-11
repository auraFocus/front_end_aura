import React, { useEffect } from 'react';
import '../styles/tokenExpiredModal.css'; 
import { AiOutlineCloseCircle } from 'react-icons/ai'; 
import { useNavigate } from 'react-router-dom';

const TokenExpiredModal = ({ isOpen}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(isOpen){
            const timeout = setTimeout(() => {
                localStorage.removeItem('token');
                navigate('/');
            },3000);

            return () => clearTimeout(timeout);
        }
    },[isOpen,navigate]);

    if(!isOpen) return null;



  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={() => navigate('/')}>
          <AiOutlineCloseCircle className="close-icon" />
        </button>
        <h2>TOKEN EXPIRADO</h2>
        <p>Faça login novamente.</p>
        <button className="modal-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default TokenExpiredModal;
