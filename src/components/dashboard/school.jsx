import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../../styles/dashboard.css"

const getSchoolID = () => {
    const token = localStorage.getItem("token");
    if(!token){
        return null;
    }

    const decodedToken = jwtDecode(token);
    return decodedToken.school_id;
};

export default function School(){
const [schools, setSchools] = useState([]);
const [loading , setLoading] = useState(true);
const [error, setError] = useState(null);
const [userSchool, setUserSchool] = useState(null);
   


const fetchSchools = async () => {
    console.log(localStorage.getItem("token"));

    try{
        const response = await axios.get("/aura/schools/all_schools", {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
        });
        
        
        const schoolsData = response.data;
        console.log(schoolsData);
        

        setSchools(schoolsData);
        const schoolIdfromToken = getSchoolID();
        const macthedSchool = schoolsData.find(
            (school) => school.id === schoolIdfromToken
        );

        if(macthedSchool){
            setUserSchool(macthedSchool);
        }

        console.log("ESCOLA USER", macthedSchool);
        
    }catch(error){
        console.error("Erro ao buscar as escolas:", error);
        setError("Erro ao buscar as escolas.");
    }
    setLoading(false);
};



useEffect(() => {
    fetchSchools();
  }, []);


    return (
        <div className="school_card">
       {loading && <p>Carregando escolas...</p>}
      {error && <p>{error}</p>}

      {userSchool ? (
        <div className="school-card">
         
          <div className="text_school_card">
           
            <h2>{userSchool.name}</h2>
          </div>
          
        </div>
      ) : (
        !loading && <p>Você não está associado a nenhuma escola.</p>
      )}

        </div>
    )
};