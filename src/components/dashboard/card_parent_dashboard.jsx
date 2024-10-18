import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import "../../styles/dashboard.css";

export default function CardParentsDashboard() {
    const [parents, setParents] = useState([]);
    const [error, setError] = useState(null);

    const fetchParents = async () => {
        console.log(localStorage.getItem("token"));
        console.log("LOGANDO URL PAIS CARD", `${import.meta.env.VITE_API_URL}`);

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/aura/parents/all_parents`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });

            const parentsData = response.data;
            console.log("URL CARD PAIS", `${import.meta.env.VITE_API_URL}/aura/parents/all_parents`);
            setParents(parentsData);

        } catch (error) {
            setError("Erro ao buscar pais: " + error.message);
        }
    };

    useEffect(() => {
        fetchParents();
    }, []);

    const parentsCounter = parents.length;

    return (
        <div className="card_dashboard_parents">
            <h2>Pais</h2>
            <FontAwesomeIcon icon={faUserFriends} className="icon_user" />
            <h3>{parentsCounter}</h3>
            {error && <p className="error_message">{error}</p>} {/* Exibir mensagem de erro, se houver */}
        </div>
    );
}
