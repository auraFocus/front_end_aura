import React from 'react';
import '../styles/users_page.css'; 

export default function ConfirmDeleteModal({ user, onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir o estudante {user.name}?</p>
        <div className="modal-actions">
          <button className="btn-confirm" onClick={() => onConfirm(user.id)}>
            Confirmar
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
