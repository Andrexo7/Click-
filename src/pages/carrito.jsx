import React from "react";
import Navbar from "../components/Navbar";
import '../assets/css/carrito.css';
import productos from '../data/productos';
import borrar from "../assets/borrar.png"

export default function Carrito({ carrito, contador,vaciarCarrito,aumentarCantidad,disminuirCantidad,eliminarProducto }) {

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);


  return (
    <>

      <div className="main-carrito">
        <div className="carrito">
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            carrito.map((producto, index) => (
              <div key={index} className="producto-en-carrito">
                <img src={producto.img} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <h2 className="precio">Precio: ${producto.precio.toLocaleString("es-CO")}</h2>
                <button className="botones"onClick={()=> disminuirCantidad(producto.id)}>-</button>
                <p className="cantidad">{producto.cantidad}</p>
                <button className="botones"onClick={()=> aumentarCantidad(producto.id)}>+</button>
                <span className="eliminar"><img  onClick={()=>eliminarProducto(producto.id)} src={borrar} alt="borrar" /></span>
              </div>
            ))
          )}

        </div>

        <div className="totales">
          <p className="unidades">Productos Totales:{totalUnidades}</p>
          <p className="precio">Total Precio: ${totalPrecio.toLocaleString("es-CO")}</p>
          <button className="comprar" >Comprar💲</button>
          <button className="vaciar" onClick={vaciarCarrito}>Vaciar Carrito🗑️</button>
    
        </div>
      </div>

      

    </>
  );
}
