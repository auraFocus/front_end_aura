import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "../../styles/dashboard.css"


export default function CardStudenDashboard(){
    const [students,SetStudents] = useState([]);
    const [error, setError] = useState(null);

    const FecthStudents = async () =>{
        console.log(localStorage.getItem("token"));


        try {
            const response = await axios.get("aura/students/all_students" ,{
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                },
            });

            const studentsData = response.data;
            console.log("DADOS ESTUDANTES",studentsData);

            SetStudents(studentsData);

            

        } catch (error) {
            setError("Erro ao buscar alunos", error)
        }

    }


useEffect(() => {
    FecthStudents();
},[]);

const studentsCounter = students.length;

    return (
        <div className="card_dashboard_students">
            <h2>Alunos</h2>
            <FontAwesomeIcon icon={faUser} className="icon_user"/>
             <h3>{studentsCounter}</h3>   
        </div>
    )
}