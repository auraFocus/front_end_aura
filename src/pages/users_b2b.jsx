import React from "react";
import School from "../components/dashboard/user_modal";
import Sidebar from "../components/sidebar";
import UsersB2BTable from "../components/users_b2b/users_b2b_table";





export default function UsersB2BPage(){
    return (
        <div className="users_page">
            <div className="header_information_dashboard">
                <School/>
                <Sidebar/>

            </div>

<UsersB2BTable/>



        </div>
    )
}