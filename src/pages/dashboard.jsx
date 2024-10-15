import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { FaUserCircle } from "react-icons/fa";
import "../styles/dashboard.css";
import CardStudenDashboard from "../components/dashboard/card_student_dashboard";
import CardTeachersDashboard from "../components/dashboard/card_teacher_dashboard";
import CardparentsDashboard from "../components/dashboard/card_parent_dashboard";
import UserModal from "../components/dashboard/user_modal";
import CardUser from "../components/card_user";

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleIconClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    

    return (
        <div className="dashboard_container">
            <Sidebar />
            <div className="header_information_dashboard">
               <CardUser/>
            </div>
            <div className="container_card_overview_users">
                <CardStudenDashboard />
                <CardTeachersDashboard />
                <CardparentsDashboard />
            </div>
        </div>
    );
};

export default Dashboard;
