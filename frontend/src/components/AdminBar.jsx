import React from 'react';
import './adminBar.css'; 
import newlogo from "../assets/newlogo.png";
const adminBar = () => {
  return (
    <header className="app-header">
      <div className="header-left">
         <img src={newlogo} alt={newlogo} />
        <h1 className="page-title">CLICK&CONNECT</h1>
      </div>
      
      <div className="header-right">
        <p className='titulito'>ADMIN PANEL</p>
      </div>
    </header>
  );
};

export default adminBar;