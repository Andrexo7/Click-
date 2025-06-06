import React from "react";
import { Link } from "react-router-dom";
import "../components/sidebar.css"; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>Admin</h1>
      <ul>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/AdminProductos">Productos</Link></li>
        <li><Link to="/pedidos">Pedidos</Link></li>
        <li><Link to="/admin">Volver al inicio</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;