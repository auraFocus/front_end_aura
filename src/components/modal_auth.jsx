import React, { useEffect } from 'react';
import '../styles/tokenExpiredModal.css'; 
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



const TokenExpiredModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            const timeout = setTimeout(() => {
                localStorage.removeItem('token');
                navigate('/'); 
                onClose();  
            }, 2000);  

            return () => clearTimeout(timeout);  // Limpa o timeout se o componente for desmontado
        }
    }, [isOpen, navigate, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>TOKEN EXPIRADO</h2>
                <FontAwesomeIcon icon={faTimes} className='close_icon_modal_auth'/>
                <p>Faça login novamente.</p>
            </div>
        </div>
    );
};

export default TokenExpiredModal;
