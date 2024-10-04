import React from 'react';
import '../../styles/students_page.css'; 

export default function ConfirmDeleteModal({ student, onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir o estudante {student.name}?</p>
        <div className="modal-actions">
          <button className="btn-confirm" onClick={() => onConfirm(student.id)}>
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
