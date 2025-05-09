import React from 'react'
import productos from "../data/productos";
import ProductCard from "../components/ProductCard";

function Categorias() {
  return (
    <div className="catalogo-general">
    <h2>Catálogo General</h2>
    <div className="productos-grid">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  </div>
  )
}

export default Categorias
