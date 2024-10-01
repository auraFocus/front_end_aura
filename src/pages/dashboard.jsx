import React from "react";
import Sidebar from "../components/sidebar";
import School from "../components/dashboard/school";
import '../styles/dashboard.css';
import CardStudenDashboard from "../components/dashboard/card_student_dashboard";
import CardTeachersDashboard from "../components/dashboard/card_teacher_dashboard";
import CardparentsDashboard from "../components/dashboard/card_parent_dashboard";

const Dashboard = () => {



    return (
        <div className="dashboard_container">   

              <Sidebar/>
              <div className="header_information_dashboard">  
              <School/>
                <div className="container_card_overview_users">
                <CardStudenDashboard/>
                <CardTeachersDashboard/>
                <CardparentsDashboard/>
                </div>
              </div>
        </div>
    )



}

export default Dashboard;