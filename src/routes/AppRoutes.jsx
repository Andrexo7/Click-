import React from "react";
import { Routes, Route } from "react-router-dom";
import Ofertas from "../pages/ofertas";
import Shop from "../pages/shop";
import Carrito from "../pages/carrito";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Shop/>} />
      <Route path="/ofertas" element={<Ofertas/>} />
      <Route path="/carrito" element={<Carrito />} />
    </Routes>
  );
}
