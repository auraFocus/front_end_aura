import React, { useState } from "react";
import "../../styles/students_page.css"

const EditStudentModal = ({ student, onClose, onConfirm }) => {
  const [editedStudent, setEditedStudent] = useState(student);

  console.log("NOME DO ESTUDANTE NO MODAL DE EXCLUSÃO",student);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({ ...editedStudent, [name]: value });
  };

  const handleConfirm = () => {
    onConfirm(editedStudent);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Estudante</h2>
        <label>
          Nome:
          <input
        
            className="input_modal_edit"
            type="text"
            name="name"
            value={editedStudent.name}
            onChange={handleChange}
          />
        </label>
        <label>
          CPF:
          <input
            className="input_modal_edit"
            type="text"
            name="cpf"
            value={editedStudent.cpf}
            onChange={handleChange}
          />
        </label>
        <label>
          Telefone:
          <input
            className="input_modal_edit"
            type="text"
            name="phone"
            value={editedStudent.phone}
            onChange={handleChange}
          />
        </label>
        <div className="modal-actions">
          <button onClick={handleConfirm} className="btn-confirm">Confirmar</button>
          <button onClick={onClose} className="btn-cancel">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;
