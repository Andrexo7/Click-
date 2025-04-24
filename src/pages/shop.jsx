import React from 'react'
import '../App.css'
import productos from "../data/productos";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Bienvenida from "../components/Bienvenida";
import newlogo from "../assets/newlogo.png"

export default function Shop() {

  return (

    <>

      <Navbar />
      <Bienvenida/>


        <div className="sinResultados" id="sinResultados">
          <img src="/imagenes/busqueda.gif" alt="sin resultados" />
          <h3>No hay publicaciones que coincidan con tu búsqueda.</h3>
          <ul>
            <li>Revisa la ortografía de la palabra.</li>
            <li>Utiliza palabras más genéricas o menos palabras.</li>
            <li>Navega por las categorías para encontrar un producto similar</li>
          </ul>
        </div>

        <section id="titulo"></section>

        <section id="productos-container" className="productos-grid">
          {productos.map(p => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </section>


        <div className="tiempo">
          <p>Tiempo en linea: <span id="tiempo">0</span> seg</p>

        </div>


      </>

  )
}

