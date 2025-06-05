import React from "react";
import { Routes, Route } from "react-router-dom";
import Ofertas from "../pages/ofertas";
import Shop from "../pages/shop";
import Carrito from "../pages/carrito";
import DetalleProducto from "../pages/DetalleProducto";
import Catalogo from "../pages/Catalogo";
import Perfil from "../pages/perfil"
import Login from "../pages/login";
import Register from "../pages/register";

export default function AppRoutes({agregarAlCarrito,carrito,vaciarCarrito,aumentarCantidad,disminuirCantidad,eliminarProducto,}){

  return(
    <Routes>
      <Route path="/" element={<Login agregarAlCarrito={agregarAlCarrito}/>} />
      <Route path="/ofertas" element={<Ofertas agregarAlCarrito={agregarAlCarrito}/>} />
      <Route path="/carrito" element={<Carrito carrito={carrito} vaciarCarrito={vaciarCarrito}eliminarProducto={eliminarProducto} aumentarCantidad={aumentarCantidad} disminuirCantidad={disminuirCantidad}/>}/>
      <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
      <Route path="/categoria/:categoria" element={<Shop agregarAlCarrito={agregarAlCarrito}/>} />
      <Route path="/Catalogo" element={<Catalogo agregarAlCarrito={agregarAlCarrito} />} />
      <Route path="/perfil" element={<Perfil/>}></Route>
      <Route path="/register" element={<Register />} />
       <Route path="/shop" element={<Shop agregarAlCarrito={agregarAlCarrito}/>} />
      
    </Routes>
  );
}

//<Route path="/admin" element={<Admin />} />
//<Route path="/login" element={<Login/>} > </Route>