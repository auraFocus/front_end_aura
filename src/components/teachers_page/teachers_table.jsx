import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEllipsisV, FaCopy } from 'react-icons/fa';
import EditteacherModal from '../edit_student_modal';
import ConfirmDeleteModal from '../confirm_delete_Modal';
import SearchBar from '../search_bar';
import '../../styles/users_page.css'

export default function TeachersTable() {
  const [teachers, setteachers] = useState([]);
  const [filteredteachers, setFilteredteachers] = useState([]);
  const [selectedteacher, setSelectedteacher] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teacherToDelete, setteacherToDelete] = useState(null);
  
  const [activeteacherId, setActiveteacherId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const [itemsPerPage, setItemsPerPage] = useState(25); 
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    const fetchteachers = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/aura/teachers/all_teachers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setteachers(data);
        setFilteredteachers(data);
      } else {
        console.error('Erro ao buscar os estudantes', response.statusText);
      }
    };
    fetchteachers();
  }, []);

  const handleSearch = async (option, value) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/aura/teachers/all_teachers?${option}=${value}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setFilteredteachers(response.data);
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

  const handleEdit = (teacher) => {
    setSelectedteacher(teacher);
  };

  const handleUpdate = async (updatedteacher) => {
    try {
      await axios.patch(`/aura/teachers/update_teacher/${updatedteacher.id}`, updatedteacher, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      showMessage(`Estudante ${updatedteacher.name} editado com sucesso`, 'success');
      setteachers((prevteachers) =>
        prevteachers.map((teacher) =>
          teacher.id === updatedteacher.id ? updatedteacher : teacher
        )
      );
      setSelectedteacher(null);
    } catch (error) {
      showMessage('Erro ao editar estudante', 'error');
      console.error('Erro ao editar estudante:', error);
    }
  };

  const handleDelete = (teacherId) => {
    setShowDeleteModal(true);
    setteacherToDelete(teachers.find((teacher) => teacher.id === teacherId));
  };

  const confirmDelete = async (teacherId) => {
    try {
      await axios.delete(`/aura/teachers/delete_teacher/${teacherId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setteachers(teachers.filter((teacher) => teacher.id !== teacherId));
      setteacherToDelete(null);
      showMessage('Estudante apagado com sucesso', 'success');
    } catch (error) {
      showMessage('Erro ao apagar estudante', 'error');
      console.error('Erro ao apagar estudante:', error);
    }
  };

  const copyToClipboard = (teacherId) => {
    navigator.clipboard.writeText(teacherId)
      .then(() => {
        showMessage('ID copiado para a área de transferência', 'success');
      })
      .catch((error) => {
        showMessage('Erro ao copiar o ID', 'error');
        console.error('Erro ao copiar o ID:', error);
      });
  };

  const toggleModal = (teacherId) => {
    setActiveteacherId(activeteacherId === teacherId ? null : teacherId);
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
  const currentteachers = filteredteachers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredteachers.length / itemsPerPage);

  return (
    <div  className='teachers_table_container'>
      

      <SearchBar onSearch={handleSearch} />
      <h2>Lista de Professores</h2>
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
          {currentteachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>
                <FaCopy onClick={() => copyToClipboard(teacher.id)} style={{ cursor: 'pointer' }} />
              </td>
              <td>{teacher.name}</td>
              <td>{teacher.cpf}</td>
              <td>{teacher.phone}</td>
              <td>
                <div className="action-button">
                  <FaEllipsisV style={{ color: 'white' }}  onClick={() => toggleModal(teacher.id)} />
                  {activeteacherId === teacher.id && (
                    <div className="modal-actions-open">
                      <button onClick={() => handleEdit(teacher)} className="action-btn">Editar</button>
                      <button onClick={() => handleDelete(teacher.id)} className="action-btn">Apagar</button>
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
          <button className='pagination_btn' key={index} onClick={() => changePage(index + 1)} disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        ))}
      </div>

      {selectedteacher && (
        <EditteacherModal
          user={selectedteacher}
          onClose={() => setSelectedteacher(null)}
          onConfirm={handleUpdate}
        />
      )}
      {showDeleteModal && teacherToDelete && (
        <ConfirmDeleteModal
          user={teacherToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
