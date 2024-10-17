import React from "react";
import Sidebar from "../components/sidebar";
import StudentsTable from "../components/students_page/students_table";
import "../styles/users_page.css"
import Footer from "../components/footer";
import CardUser from "../components/card_user";






export default function StudentsPage(){
    return (
        <div className="users_page">
             <div className="header_information_dashboard">
             
             <Sidebar/>
             <CardUser/>
             </div> 

             <StudentsTable/>

             <Footer/>
        </div>
    )
}