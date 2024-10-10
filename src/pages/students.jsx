import React from "react";
import School from "../components/dashboard/school";
import Sidebar from "../components/sidebar";
import StudentsTable from "../components/students_page/students_table";
import "../styles/users_page.css"
import Footer from "../components/footer";






export default function StudentsPage(){
    return (
        <div className="users_page">
             <div className="header_information_dashboard">
             
             <School/>
             <Sidebar/>
             </div> 

             <StudentsTable/>

             <Footer/>
        </div>
    )
}