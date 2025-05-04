import React from "react";
import { Link } from "react-router-dom";
import newlogo from "../assets/newlogo.png"
import './Bienvenida.css'

export default function Bienvenida() {
  return (
    <div className="welcomeFondo" id="welcomeFondo">
    <div className="welcome-container">
      <h1 className="welcome-title">!Bienvenido a Click & Connect¡</h1>
      <p className="welcome-text">Acercate a la tecnologia con la variedad de productos que tenemos para ti a los
        mejores
        precios</p>
      <img className="img-fondo" src= {newlogo} alt="Logo Tienda Jadl" />
    </div>
    </div>
  );
}


