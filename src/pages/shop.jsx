import React from 'react'
import '../assets/css/Shop.css'
import productos from "../data/productos";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Bienvenida from "../components/Bienvenida";
import newlogo from "../assets/newlogo.png"
import { Link } from 'react-router-dom';

export default function Shop({agregarAlCarrito}) {
  return (

    <>
    
      <Bienvenida/>

        <section id="titulo"></section>

        <section id="productos-container" className="productos-grid">
          {productos.map(p => (
            <ProductCard 
            key={p.id} producto={p} agregarAlCarrito={agregarAlCarrito}/>
          ))}
        </section>


        <div className="tiempo">
          <p>Tiempo en linea: <span id="tiempo">0</span> seg</p>
        </div>


      </>

  )
}

