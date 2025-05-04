import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import newlogo from "../assets/newlogo.png";
import carrito from '../assets/carrito.png';
import menu from "../assets/menu.png";
import productos from "../data/productos";


export default function Navbar({contador}) {
  return (
    <nav className="navbar">

      <div className="logo">
        <img src={newlogo} alt="Logo Tienda" />
        <span>Click&connect</span>
      </div>

      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">
        <img src={menu} alt="menu icon" />
      </label>

      <ul className="navbar-menu">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/ofertas">Ofertas</Link></li>
        <li><Link to="/carrito"><img src={carrito} alt="carrito" /></Link><span className="contador">{contador}</span></li>
        <li> Categorías
          <div className="menu-categorias">
            <button>Ver Todas😎</button>
            <button>Consolas🎮</button>
            <button>Audio🎶</button>
            <button>TV📺</button>
            <button>Celulares📱</button>
            <button>Tablets📔</button>
          </div>
        </li>
      </ul>
    </nav>
  );
}
