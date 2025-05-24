import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../assets/css/DetalleProducto.css";

function DetalleProducto({ agregarAlCarrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/productos/${id}`)
      .then((res) => res.json())
      .then((data) => setProducto(data))
      .catch((error) => console.error("Error al cargar producto:", error));
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="App">
      <div className="details">
        <div className="big-img">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="box">
          <div className="row">
            <h2>{producto.nombre}</h2>
          </div>

          <p className="descripcion">{producto.descripcion}</p>
          <span>Precio: ${Number(producto.precio).toLocaleString("es-CO")}</span>
          <button className="cart" onClick={() => agregarAlCarrito(producto)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
