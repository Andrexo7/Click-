import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import '../assets/css/Shop.css';
import ProductCard from "../components/ProductCard";
import newlogo from "../assets/newlogo.png";
import Carrusel from '../components/Carrusel';

export default function Shop({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [destacados, setDestacados] = useState([]);
  const { categoria } = useParams();
  const navigate = useNavigate();
  const rol = localStorage.getItem('rol');

  // Move navigation to useEffect
  useEffect(() => {
    if (rol !== 'cliente') {
      navigate('/login');
    }
  }, [rol, navigate]);

  useEffect(() => {
    fetch("http://localhost:4000/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        const seleccionados = [...data].sort(() => Math.random() - 0.5).slice(0, 12);
        setDestacados(seleccionados);
      })
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  const productosAMostrar = categoria
    ? productos.filter((p) => p.categoria === categoria)
    : destacados;

  const titulo = categoria
    ? ` 💙 ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`
    : "✨  Productos Destacados  ✨";

  return (
    <>
      {!categoria && <Carrusel />}
      <section className="titulo">
        <h1>{titulo}</h1>
      </section>
      <section id="productos-container" className="productos-grid">
        {productosAMostrar.map((p) => (
          <ProductCard
            key={p.id}
            producto={p}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </section>
      <div className="tiempo">
        <p>
          Tiempo en linea: <span id="tiempo">0</span> seg
        </p>
      </div>
    </>
  );
}