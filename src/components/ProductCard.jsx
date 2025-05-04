import React, {useState} from 'react';
import productos from '../data/productos';
import './ProductCard.css';
import { Link } from 'react-router-dom';


function ProductCard({ producto, agregarAlCarrito }) {
  return (
    <div className="card">
      <Link to={`/producto/${producto.id}`}>
      <img src={producto.img} alt={producto.nombre} className="card-img" />
      </Link>
      <h3>{producto.nombre}</h3>
      <p>${producto.precio.toLocaleString("es-CO")}</p>
      <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  );
}

export default ProductCard;
