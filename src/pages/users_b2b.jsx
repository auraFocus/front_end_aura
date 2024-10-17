import React from "react";
import Sidebar from "../components/sidebar";
import UsersB2BTable from "../components/users_b2b/users_b2b_table";
import CardUser from "../components/card_user";





export default function UsersB2BPage(){
    return (
        <div className="users_page">
            <div className="header_information_dashboard">
                <Sidebar/>
                <CardUser/>
            </div>

<UsersB2BTable/>



        </div>
    )
}