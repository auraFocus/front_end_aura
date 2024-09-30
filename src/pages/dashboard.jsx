import React from "react";
import Sidebar from "../components/sidebar";
import School from "../components/dashboard/school";
import '../styles/dashboard.css';

const Dashboard = () => {



    return (
        <div className="dashboard_container">   

              <Sidebar/>
              <div className="header_information_dashboard">  
              <School/>

              </div>
        </div>
    )



}

export default Dashboard;