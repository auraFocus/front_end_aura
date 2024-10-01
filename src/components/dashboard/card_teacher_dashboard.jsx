import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import "../../styles/dashboard.css"


export default function CardTeachersDashboard(){
    const [teachers,Setteachers] = useState([]);
    const [error, setError] = useState(null);

    const Fecthteachers = async () =>{
        console.log(localStorage.getItem("token"));


        try {
            const response = await axios.get("aura/teachers/all_teachers" ,{
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                },
            });

            const teachersData = response.data;
            console.log("DADOS PROFESSORES",teachersData);

            Setteachers(teachersData);

            

        } catch (error) {
            setError("Erro ao buscar alunos", error)
        }

    }


useEffect(() => {
    Fecthteachers();
},[]);

const teachersCounter = teachers.length;

    return (
        <div className="card_dashboard_teachers">
            <h2>Professores</h2>
            <FontAwesomeIcon icon={faChalkboardTeacher} className="icon_user"/>
             <h3>{teachersCounter}</h3>   
        </div>
    )
}