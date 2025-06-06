import React, { useState, useEffect } from 'react';
import "../assets/css/ofertas.css";
import ProductCard from '../components/ProductCard';

function Ofertas({agregarAlCarrito}) {

  const [EnOferta, setEnOferta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await fetch("http://localhost:4000/productos");
        if (!response.ok) throw new Error("Error al cargar los artículos");
        const data = await response.json();
        const productosEnOferta = data.filter((articulo) => articulo.en_oferta === 1);
        setEnOferta(productosEnOferta);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOfertas();
  }, []);

// scroll de ver más ofertas//
  const handlescroll = () => {
    productosRef.current?.scrollIntoView({
      behavior: 'smooth',});};

  if (loading) return <div className="loading">Cargando ofertas...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (EnOferta.length === 0) return <div className='no-ofertas'>No hay ofertas disponibles en este momento.</div>;

  return (
    <div className="ofertas-container">
      <h1>¡Ofertas!</h1>
      <h2>Al alcance de tus manos😉</h2>
      <p className='ofertas-texto'>Descubre los mejores descuentos en productos seleccionados. 
        ¡Hasta 70% de descuento!</p>
      <section className="productos-grid">
        {EnOferta.map((producto) => (
          <ProductCard key={producto.id} producto={producto} agregarAlCarrito={agregarAlCarrito} />
        ))}
      </section>
    </div>
  );
}

export default Ofertas;
