import React from "react";
import { Routes, Route } from "react-router-dom";
import Ofertas from "../pages/ofertas";
import Shop from "../pages/shop";
import Carrito from "../pages/carrito";
import DetalleProducto from "../pages/DetalleProducto";
import Categorias from "../pages/categorias";

export default function AppRoutes({agregarAlCarrito,carrito,vaciarCarrito,aumentarCantidad,disminuirCantidad,eliminarProducto,}){

  return(
    <Routes>
      <Route path="/" element={<Shop agregarAlCarrito={agregarAlCarrito}/>} />
      <Route path="/ofertas" element={<Ofertas/>} />
      <Route path="/carrito" element={<Carrito carrito={carrito} vaciarCarrito={vaciarCarrito}eliminarProducto={eliminarProducto} aumentarCantidad={aumentarCantidad} disminuirCantidad={disminuirCantidad}/>}/>
      <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
      <Route path="/categoria/:categoria" element={<Shop />} />
      <Route path="/Categorias" element={<Categorias/>} />


    </Routes>
  );
}
