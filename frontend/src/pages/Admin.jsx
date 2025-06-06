import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import '../assets/css/Admin.css';
import AdminBar from "../components/AdminBar";




const Admin = () => {
  return (
    <div>
      <AdminBar/>
       <div className="admin-container">
    
      <Sidebar />
      <div className="admin-content">
        <h1 className="admin-title">Panel de Administración</h1>
        <Outlet />
        
      </div>
    </div>

    </div>
   
  );
};

export default Admin;
