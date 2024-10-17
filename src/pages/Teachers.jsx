import React from "react";
import Sidebar from "../components/sidebar";
import TeachersTable from "../components/teachers_page/teachers_table";
import CardUser from "../components/card_user";



export default function Teachers(){
    return (
        <div className="users_page">
            <div className="header_information_dashboard">
            <Sidebar/>
            <CardUser/>
            </div>
            <TeachersTable/>
        </div>
    )
}