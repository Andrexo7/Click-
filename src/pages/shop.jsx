import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import '../assets/css/Shop.css'
import productos from "../data/productos";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Bienvenida from "../components/Bienvenida";
import newlogo from "../assets/newlogo.png"
import { Link } from 'react-router-dom';
import Carrusel from '../components/Carrusel';

export default function Shop({agregarAlCarrito}) {
 /*mostrar productos destacados si no hay categoria seleccionada*/
  const { categoria } = useParams();

  let productosAMostrar = categoria
  ? productos.filter((p) => p.categoria === categoria)
  : [...productos].sort(() => Math.random() - 0.5).slice(0, 12);

  const titulo = categoria
    ? `Categoria   ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`
    : "Productos Destacados ⭐";




  return (

    <>

        {!categoria && <Carrusel />}


        <section id="titulo">
         <h1>{titulo}</h1> 
        </section>

        <section id="productos-container" className="productos-grid">
          {productosAMostrar.map(p => (
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

