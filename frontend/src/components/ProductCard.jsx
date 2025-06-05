import React, {useState} from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';


function ProductCard({ producto, agregarAlCarrito }) {

  const formatoPrecio = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  return (
    <div className="card">
      <Link to={`/producto/${producto.id}`}>
        <img src={producto.imagen} alt={producto.nombre} className="card-img" />
      </Link>
      <h3>{producto.nombre}</h3>
      <p className="precio-actual">
        {producto.en_oferta === 1 ? formatoPrecio.format(producto.precio_oferta) : formatoPrecio.format(producto.precio)}
      </p>
      <p className='precio-anterior'>{producto.en_oferta === 1 ? formatoPrecio.format(producto.precio) : ''}</p>
      <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  );
}

export default ProductCard;
