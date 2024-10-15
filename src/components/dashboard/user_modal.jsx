import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../../styles/dashboard.css"; // Adicione o estilo do modal

const getSchoolID = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    const decodedToken = jwtDecode(token);
    return decodedToken.school_id;
};

const getUserName = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    const decodedToken = jwtDecode(token);
    return decodedToken.name || "Usuário";
};

export default function UserModal({ onClose, onLogout }) {
    const [userSchool, setUserSchool] = useState(null);

    const fetchSchool = async () => {
        try {
            const response = await axios.get("/aura/schools/all_schools", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const schoolsData = response.data;
            const schoolId = getSchoolID();
            const matchedSchool = schoolsData.find(
                (school) => school.id === schoolId
            );

            if (matchedSchool) {
                setUserSchool(matchedSchool);
            }
        } catch (error) {
            console.error("Erro ao buscar a escola:", error);
        }
    };

    useEffect(() => {
        fetchSchool();
    }, []);

    return (
        <div className="user_modal_overlay" onClick={onClose}>
            <div className="user_modal_content" onClick={(e) => e.stopPropagation()}>
                <h3>{getUserName()}</h3>
                {userSchool ? (
                    <p>Escola: {userSchool.name}</p>
                ) : (
                    <p>Você não está associado a nenhuma escola.</p>
                )}
                <button onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
}
