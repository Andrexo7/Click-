import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../assets/css/Shop.css'
import ProductCard from "../components/ProductCard";
import newlogo from "../assets/newlogo.png"
import Carrusel from '../components/Carrusel';

export default function Shop({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const  [destacados,Setdestacados]=useState([])
  const { categoria } = useParams();

  useEffect(() => {
    fetch("http://localhost:4000/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        const selecionados =[...data].sort(() =>Math.random() -0.5).slice(0, 12);
        Setdestacados(selecionados)
      })
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  /*mostrar productos destacados si no hay categoria seleccionada*/


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
        {productosAMostrar.map(p => (
          <ProductCard
            key={p.id} producto={p} agregarAlCarrito={agregarAlCarrito} />
        ))}
      </section>


      <div className="tiempo">
        <p>Tiempo en linea: <span id="tiempo">0</span> seg</p>
      </div>




    </>

  )
}

