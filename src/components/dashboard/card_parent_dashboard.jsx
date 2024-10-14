import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import "../../styles/dashboard.css"


export default function CardparentsDashboard(){
    const [parents,Setparents] = useState([]);
    const [error, setError] = useState(null);

    const Fecthparents = async () =>{
        console.log(localStorage.getItem("token"));

	    console.log("LOGANDO URL PAIS CARD",`${import.meta.env.VITE_API_URL}/aura/parents/all_parents`);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/aura/parents/all_parents` ,{
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                },
            });

            const parentsData = response.data;
            console.log("URL CARD PAIS",`${import.meta.env.VITE_API_URL}/aura/parents/all_parents`);

            Setparents(parentsData);

            

        } catch (error) {
            setError("Erro ao buscar alunos", error)
        }

    }


useEffect(() => {
    Fecthparents();
},[]);

const parentsCounter = parents.length;

    return (
        <div className="card_dashboard_parents">
            <h2>Pais</h2>
            <FontAwesomeIcon icon={faUserFriends} className="icon_user"/>
             <h3>{parentsCounter}</h3>   
        </div>
    )
}
