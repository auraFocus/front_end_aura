import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEllipsisV, FaCopy } from 'react-icons/fa';
import EditStudentModal from './edit_student_modal';
import ConfirmDeleteModal from './confirm_delete_Modal';
import SearchBar from '../search_bar';

export default function StudentsTable() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  
  const [activeStudentId, setActiveStudentId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const [itemsPerPage, setItemsPerPage] = useState(25); // Estado para o número de itens por página
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/aura/students/all_students', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } else {
        console.error('Erro ao buscar os estudantes', response.statusText);
      }
    };
    fetchStudents();
  }, []);

  const handleSearch = async (option, value) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/aura/students/all_students?${option}=${value}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setFilteredStudents(response.data);
    } catch (error) {
      console.error('Erro ao buscar estudantes:', error);
    }
  };

  const showMessage = (msg, type, duration = 3000) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, duration);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
  };

  const handleUpdate = async (updatedStudent) => {
    try {
      await axios.patch(`/aura/students/update_student/${updatedStudent.id}`, updatedStudent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      showMessage(`Estudante ${updatedStudent.name} editado com sucesso`, 'success');
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
      setSelectedStudent(null);
    } catch (error) {
      showMessage('Erro ao editar estudante', 'error');
      console.error('Erro ao editar estudante:', error);
    }
  };

  const handleDelete = (studentId) => {
    setShowDeleteModal(true);
    setStudentToDelete(students.find((student) => student.id === studentId));
  };

  const confirmDelete = async (studentId) => {
    try {
      await axios.delete(`/aura/students/delete_student/${studentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStudents(students.filter((student) => student.id !== studentId));
      setStudentToDelete(null);
      showMessage('Estudante apagado com sucesso', 'success');
    } catch (error) {
      showMessage('Erro ao apagar estudante', 'error');
      console.error('Erro ao apagar estudante:', error);
    }
  };

  const copyToClipboard = (studentId) => {
    navigator.clipboard.writeText(studentId)
      .then(() => {
        showMessage('ID copiado para a área de transferência', 'success');
      })
      .catch((error) => {
        showMessage('Erro ao copiar o ID', 'error');
        console.error('Erro ao copiar o ID:', error);
      });
  };

  const toggleModal = (studentId) => {
    setActiveStudentId(activeStudentId === studentId ? null : studentId);
  };


  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); 
  };

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  return (
    <div>
      <h2>Lista de Estudantes</h2>

      <SearchBar onSearch={handleSearch} />

      {message && (
        <div className={`message ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
          {message}
        </div>
      )}

      <div className='container_paginacao'>
        <label className='label_paginacao'>Itens por página:</label>
        <select  className='select_paginacao'value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option className='option_paginacao' value={25}>25</option>
          <option className='option_paginacao' value={75}>75</option>
          <option className='option_paginacao' value={100}>100</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td>
                <FaCopy onClick={() => copyToClipboard(student.id)} style={{ cursor: 'pointer' }} />
              </td>
              <td>{student.name}</td>
              <td>{student.cpf}</td>
              <td>{student.phone}</td>
              <td>
                <div className="action-button">
                  <FaEllipsisV onClick={() => toggleModal(student.id)} />
                  {activeStudentId === student.id && (
                    <div className="modal-actions-open">
                      <button onClick={() => handleEdit(student)} className="action-btn">Editar</button>
                      <button onClick={() => handleDelete(student.id)} className="action-btn">Apagar</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => changePage(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
      </div>

      {selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onConfirm={handleUpdate}
        />
      )}
      {showDeleteModal && studentToDelete && (
        <ConfirmDeleteModal
          student={studentToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
