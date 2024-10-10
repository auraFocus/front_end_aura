import React from "react";
import "../styles/users_page.css"
import School from "../components/dashboard/school";
import Sidebar from "../components/sidebar";
import ParentsTable from "../components/user_parents/parents_table";
import Footer from "../components/footer";




export default function Parents(){










    return (
        <div className="users_page">
            <div className="header_information_dashboard">
                <School/>
                <Sidebar/>

            </div>

            <ParentsTable/>
            <Footer/>
        </div>
    )
}