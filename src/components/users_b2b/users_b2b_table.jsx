import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEllipsisV, FaCopy } from 'react-icons/fa';
import Edituser_b2bModal from '../edit_student_modal';
import ConfirmDeleteModal from '../confirm_delete_Modal';
import SearchBar from '../search_bar';
import '../../styles/users_page.css'

export default function UsersB2BTable() {
  const [user_b2bs, setuser_b2bs] = useState([]);
  const [filtereduser_b2bs, setFiltereduser_b2bs] = useState([]);
  const [selecteduser_b2b, setSelecteduser_b2b] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [user_b2bToDelete, setuser_b2bToDelete] = useState(null);
  
  const [activeuser_b2bId, setActiveuser_b2bId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const [itemsPerPage, setItemsPerPage] = useState(25); 
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    const fetchuserB2bs = async () => {
      const token = localStorage.getItem('token')
      console.log("TOKEN TELA B2B", token);
      
      const response = await fetch('/aura/b2b_admin/all_b2badmin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        
        
        const data = await response.json();
        
        setuser_b2bs(data);
        setFiltereduser_b2bs(data);
        console.log("LOGS ADMINS",data);
      } else {
        console.error('Erro ao buscar os estudantes', response.statusText);
      }
    };
    fetchuserB2bs();
  }, []);

  const handleSearch = async (option, value) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/aura/b2b_admin/all_b2badmin?${option}=${value}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setFiltereduser_b2bs(response.data);
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

  const handleEdit = (user_b2b) => {

    console.log("USER_B2B EDITANDO NA TABELA",user_b2b);
    setSelecteduser_b2b(user_b2b);
    console.log("USER NO STATE TABELA",user_b2b);
    
    
  };

  const handleUpdate = async (updateduser_b2b) => {
    try {
      await axios.patch(`/aura/b2b_admin/update_b2b_admin/${updateduser_b2b.id}`, updateduser_b2b, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      showMessage(`Estudante ${updateduser_b2b.name} editado com sucesso`, 'success');
      setuser_b2bs((prevuser_b2bs) =>
        prevuser_b2bs.map((user_b2b) =>
          user_b2b.id === updateduser_b2b.id ? updateduser_b2b : user_b2b
        )
      );
      setSelecteduser_b2b(null);
    } catch (error) {
      showMessage('Erro ao editar estudante', 'error');
      console.error('Erro ao editar estudante:', error);
    }
  };

  const handleDelete = (user_b2bId) => {
    setShowDeleteModal(true);
    console.log("LOGANDO ID DO USER NO HANDLE DELETE", user_b2bId);
    
    setuser_b2bToDelete(user_b2bs.find((user_b2b) => user_b2b.id === user_b2bId));

    console.log("LOGANDO USER TO DELETE", user_b2bToDelete);
    
  };

  const confirmDelete = async (user_b2bId) => {
    try {
      await axios.delete(`/aura/b2b_admin/delete_b2b_admin/${user_b2bId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setuser_b2bs(user_b2bs.filter((user_b2b) => user_b2b.id !== user_b2bId));
      setuser_b2bToDelete(null);
      showMessage('Estudante apagado com sucesso', 'success');
    } catch (error) {
      showMessage('Erro ao apagar estudante', 'error');
      console.error('Erro ao apagar estudante:', error);
    }
  };

  const copyToClipboard = (user_b2bId) => {
    navigator.clipboard.writeText(user_b2bId)
      .then(() => {
        showMessage('ID copiado para a área de transferência', 'success');
      })
      .catch((error) => {
        showMessage('Erro ao copiar o ID', 'error');
        console.error('Erro ao copiar o ID:', error);
      });
  };

  const toggleModal = (user_b2bId) => {
    setActiveuser_b2bId(activeuser_b2bId === user_b2bId ? null : user_b2bId);
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
  const currentuser_b2bs = filtereduser_b2bs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtereduser_b2bs.length / itemsPerPage);


  return (
    <div  className='user_b2bs_table_container'>
      

      <SearchBar onSearch={handleSearch} />
      <h2>Lista de Administradores</h2>
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
          {currentuser_b2bs.map((user_b2b) => (
            <tr key={user_b2b.id}>
              <td>
                <FaCopy onClick={() => copyToClipboard(user_b2b.id)} style={{ cursor: 'pointer' }} />
              </td>
              <td>{user_b2b.name}</td>
              <td>{user_b2b.cpf}</td>
              <td>{user_b2b.phone}</td>
              <td>
                <div className="action-button">
                  <FaEllipsisV style={{ color: 'white' }}  onClick={() => toggleModal(user_b2b.id)} />
                  {activeuser_b2bId === user_b2b.id && (
                    <div className="modal-actions-open">
                      <button onClick={() => handleEdit(user_b2b)} className="action-btn">Editar</button>
                      <button onClick={() => handleDelete(user_b2b.id)} className="action-btn">Apagar</button>
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

      {selecteduser_b2b && (
        <Edituser_b2bModal
          user={selecteduser_b2b}
          onClose={() => setSelecteduser_b2b(null)}
          onConfirm={handleUpdate}
        />
      )}
      {showDeleteModal && user_b2bToDelete && (
        <ConfirmDeleteModal
          user_b2b={user_b2bToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
