import React from "react";
import { Link, useNavigate} from "react-router-dom";
import './Navbar.css';
import newlogo from "../assets/newlogo.png";
import carrito from '../assets/carrito.png';
import menu from "../assets/menu.png";
import iconoPerfil from "../assets/iconoPerfil.png";




export default function Navbar({contador}) {

  const navigate = useNavigate();

  const irACategoria = (categoria) => {
    navigate(`/categoria/${categoria}`);
  };
  
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
        <li><Link  to="/">Inicio</Link></li>
        <li><Link to="/ofertas">Ofertas</Link></li>
        <li> <Link to="/Catalogo">Catalogo</Link>
          <div className="menu-categorias">
            <h3>categorias</h3>
            <button className="boton" onClick={() => irACategoria("Consolas")}>Consolas🎮</button>
            <button className="boton" onClick={() => irACategoria("Audio")}>Audio🎶</button>
            <button className="boton" onClick={() => irACategoria("Tv")}>TV📺</button>
            <button className="boton" onClick={() => irACategoria("Celulares")}>Celulares📱</button>
            <button className="boton" onClick={() => irACategoria("Tablets")}>Tablets📔</button>
          </div>
        </li>
        <li><Link to="/carrito"><img src={carrito} alt="carrito" /></Link><span className="contador">{contador}</span></li>
        <li><Link to="/Perfil"><img src={iconoPerfil} alt="perfil" /></Link></li>
       
      </ul>
    </nav>
  ); 
}
// <li><Link to="/login"></Link>login</li>//