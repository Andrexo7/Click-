import { useParams } from "react-router-dom";
import React,{useEffect, useState} from 'react'
import ProductCard from "../components/ProductCard";
import '../assets/css/catalogo.css'


function Catalogo({agregarAlCarrito}) {
    const { categoria } = useParams();
    const [productos, setProductos] = useState([]);

     useEffect(() => {
      fetch("http://localhost:4000/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  return (
    <div className="catalogo-general">
    <h2>Catálogo General</h2>
    <div className="productos-grid">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} agregarAlCarrito={agregarAlCarrito} />
      ))}
    </div>
  </div>
  )
}

export default Catalogo
