import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/ofertas">Ofertas</Link>
      <Link to="/carrito">Carrito</Link>
    </nav>
  );
}
