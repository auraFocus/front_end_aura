import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa';
import EditStudentModal from './edit_student_modal';
import ConfirmDeleteModal from './confirm_delete_Modal';
import SearchBar from '../search_bar';

export default function StudentsTable() {
  const [students, setStudents] = useState([]);
  const [activeStudentId, setActiveStudentId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null); 
  const [filteredStudents, setFilteredStudents] = useState([]); // Estudantes filtrados pela busca

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
        setFilteredStudents(data); // Inicialmente, a lista filtrada é a mesma que a lista completa
      } else {
        console.error('Erro ao buscar os estudantes', response.statusText);
      }
    };
    fetchStudents();
  }, []);

  const handleSearch = async (option, value) => {
    console.log("URL SENDO PASSADA PARA BUSCA: ",`/aura/students/all_students?${option}=${value}`);
    
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
      alert(`Estudante ${updatedStudent.name} editado com sucesso`);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
      setSelectedStudent(null); 
    } catch (error) {
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
      alert('Estudante apagado com sucesso');
    } catch (error) {
      console.error('Erro ao apagar estudante:', error);
    }
  };

  const toggleModal = (studentId) => {
    setActiveStudentId(activeStudentId === studentId ? null : studentId);
  };

  return (
    <div>
      <h2>Lista de Estudantes</h2>

      {/* Barra de busca com dropdown */}
      <SearchBar onSearch={handleSearch} />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.cpf}</td>
              <td>{student.phone}</td>
              <td>
                <div className="action-button">
                  <FaEllipsisV onClick={() => toggleModal(student.id)} />
                  {activeStudentId === student.id && (
                    <div className="modal-actions-open">
                      <button
                        onClick={() => handleEdit(student)}
                        className="action-btn"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="action-btn"
                      >
                        Apagar
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
''