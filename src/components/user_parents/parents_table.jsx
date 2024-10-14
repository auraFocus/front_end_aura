import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEllipsisV, FaCopy } from 'react-icons/fa';
import EditparentModal from '../edit_student_modal';
import ConfirmDeleteModal from '../confirm_delete_Modal';
import SearchBar from '../search_bar';
import '../../styles/users_page.css'

export default function ParentsTable() {
  const [parents, setparents] = useState([]);
  const [filteredparents, setFilteredparents] = useState([]);
  const [selectedparent, setSelectedparent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [parentToDelete, setparentToDelete] = useState(null);
  
  const [activeparentId, setActiveparentId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const [itemsPerPage, setItemsPerPage] = useState(25); 
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    const fetchparents = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/aura/parents/all_parents`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setparents(data);
        setFilteredparents(data);
      } else {
        console.error('Erro ao buscar os estudantes', response.statusText);
      }
    };
    fetchparents();
  }, []);

  const handleSearch = async (option, value) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/aura/parents/all_parents?${option}=${value}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setFilteredparents(response.data);
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

  const handleEdit = (parent) => {
    setSelectedparent(parent);
  };

  const handleUpdate = async (updatedparent) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/aura/parentes/update_parent/${updatedparent.id}`, updatedparent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      showMessage(`Estudante ${updatedparent.name} editado com sucesso`, 'success');
      setparents((prevparents) =>
        prevparents.map((parent) =>
          parent.id === updatedparent.id ? updatedparent : parent
        )
      );
      setSelectedparent(null);
    } catch (error) {
      showMessage('Erro ao editar estudante', 'error');
      console.error('Erro ao editar estudante:', error);
    }
  };

  const handleDelete = (parentId) => {
    setShowDeleteModal(true);
    setparentToDelete(parents.find((parent) => parent.id === parentId));
  };

  const confirmDelete = async (parentId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/aura/parentes/delete_parent/${parentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setparents(parents.filter((parent) => parent.id !== parentId));
      setparentToDelete(null);
      showMessage('Estudante apagado com sucesso', 'success');
    } catch (error) {
      showMessage('Erro ao apagar estudante', 'error');
      console.error('Erro ao apagar estudante:', error);
    }
  };

  const copyToClipboard = (parentId) => {
    navigator.clipboard.writeText(parentId)
      .then(() => {
        showMessage('ID copiado para a área de transferência', 'success');
      })
      .catch((error) => {
        showMessage('Erro ao copiar o ID', 'error');
        console.error('Erro ao copiar o ID:', error);
      });
  };

  const toggleModal = (parentId) => {
    setActiveparentId(activeparentId === parentId ? null : parentId);
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
  const currentparents = filteredparents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredparents.length / itemsPerPage);

  return (
    <div  className='parents_table_container'>
      

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
          {currentparents.map((parent) => (
            <tr key={parent.id}>
              <td>
                <FaCopy onClick={() => copyToClipboard(parent.id)} style={{ cursor: 'pointer' }} />
              </td>
              <td>{parent.name}</td>
              <td>{parent.cpf}</td>
              <td>{parent.phone}</td>
              <td>
                <div className="action-button">
                  <FaEllipsisV style={{ color: 'white' }}  onClick={() => toggleModal(parent.id)} />
                  {activeparentId === parent.id && (
                    <div className="modal-actions-open">
                      <button onClick={() => handleEdit(parent)} className="action-btn">Editar</button>
                      <button onClick={() => handleDelete(parent.id)} className="action-btn">Apagar</button>
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

      {selectedparent && (
        <EditparentModal
          user={selectedparent}
          onClose={() => setSelectedparent(null)}
          onConfirm={handleUpdate}
        />
      )}
      {showDeleteModal && parentToDelete && (
        <ConfirmDeleteModal
          user={parentToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
