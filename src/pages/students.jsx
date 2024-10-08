import React from "react";
import School from "../components/dashboard/school";
import Sidebar from "../components/sidebar";
import StudentsTable from "../components/students_page/students_table";
import "../styles/students_page.css"






export default function StudentsPage(){
    return (
        <div className="students_page">
             <div className="header_information_dashboard">
             
             <School/>
             <Sidebar/>
             </div> 

             <StudentsTable/>
        </div>
    )
}