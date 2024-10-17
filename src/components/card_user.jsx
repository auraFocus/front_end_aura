import React, { useEffect, useRef, useState } from "react";
import "../styles/dashboard.css"
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa";

export default function CardUser(){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [userName, setUsername] = useState(null);
    const [userSchool, setUserSchool] = useState(null);
    const [schools, setSchools] = useState([]);
    
    const getSchoolID = () => {
        const token = localStorage.getItem("token");
        if(!token){
            return null;
        }
    
        const decodedToken = jwtDecode(token);
        return decodedToken.school_id;
    };
    
    
    

    const fetchSchools = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/aura/schools/all_schools`, {
                headers:{
                    "Content-Type":"application/json",
                     Authorization:`Bearer ${localStorage.getItem("token")}`
                },
            });
            
            const schoolsData = response.data;
            setSchools(schoolsData);
            const schoolIDfromToken = getSchoolID();
            const matchedSchool = schoolsData.find(
            (school) => school.id === schoolIDfromToken
            );
            
            if(matchedSchool){
                setUserSchool(matchedSchool)
            }
        } catch (error) {
            console.log("erro no card das escolas",error);
            
        }
    }
    

    useEffect(()=> {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        
        const name = decodedToken.name;
        setUsername(name);
    })



    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };


    useEffect(() => {
        fetchSchools();
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    
    return (
        <div className="card_user_container">
             <div className="user_icon_dropdown" onClick={toggleDropdown} ref={dropdownRef}>
                    <FaUserCircle size={40} />
                    {isDropdownOpen && (
                        <div className="dropdown_menu">
                            <div className="dropdown_header">
                                <FaUserCircle size={30} />
                                <span>{userName}</span>
                                <p>{userSchool.name}</p>
                            </div>
                            <ul className="dropdown_list">
                                
                                <button className="logout_button" onClick={handleLogout}>
                                     <FaSignOutAlt className="logout_icon" /> Logout
                                </button>
                            </ul>
                           
                        </div>
                    )}
                </div>
            </div>
       
    )
}