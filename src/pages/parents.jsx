import React from "react";
import "../styles/users_page.css"
import Sidebar from "../components/sidebar";
import ParentsTable from "../components/user_parents/parents_table";
import Footer from "../components/footer";
import CardUser from "../components/card_user";




export default function Parents(){










    return (
        <div className="users_page">
            <div className="header_information_dashboard">
                <Sidebar/>
                <CardUser/>
            </div>

            <ParentsTable/>
            <Footer/>
        </div>
    )
}