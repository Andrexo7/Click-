import React from 'react';
import productos from '../data/productos';
import '../App.css'


function ProductCard({ producto }) {
  return (
    <div className="card">
      <img src={producto.img} alt={producto.nombre} className="card-img" />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio.toLocaleString("es-CO")}</p>
      <button onClick={() => console.log(`Agregado ${producto.nombre}`)}>Agregar al carrito</button>
    </div>
  );
}

export default ProductCard;
