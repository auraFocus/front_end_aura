import React from "react";
import Sidebar from "../components/sidebar";
import TeachersTable from "../components/teachers_page/teachers_table";
import School from "../components/dashboard/school";



export default function Teachers(){
    return (
        <div className="users_page">
            <div className="header_information_dashboard">
            <School/>
            <Sidebar/>
            </div>
            <TeachersTable/>
        </div>
    )
}