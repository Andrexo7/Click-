import { Link } from 'react-router-dom';
import '../assets/css/carrito.css';
import borrar from "../assets/borrar.png"
import vacio from "../assets/carritoVacio.png"

export default function Carrito({ carrito,vaciarCarrito,aumentarCantidad,disminuirCantidad,eliminarProducto }) {

  const formatoPrecio = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => {
  const precio = item.precio_oferta ?? item.precio;  // Usa el precio de la oferta si existe, sino muestra el precio normal
  return acc + precio * item.cantidad;
}, 0);

 const manejarPago = async () => {
  try {
      const res = await fetch("http://localhost:4000/pagos/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ carrito }) // envías el carrito al backend
      });

      const data = await res.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Error al generar enlace de pago.");
      }
    } catch (error) {
      console.error("Error en el pago:", error);
      alert("No se pudo generar el pago.");
    }
  };



  


  return (
    <>

      <div className="main-carrito">
        <div className="carrito">
          {carrito.length === 0 ? (
            <span className="carrito-vacio"> <Link to={'/'}><p>Tu carrito está vacío.</p></Link><img src={vacio} alt="borrar" /></span>
           
          ) : (
            carrito.map((producto) => (
              <div key={producto.id} className="producto-en-carrito">
                <Link to={`/producto/${producto.id}`}>
                  <img src={producto.imagen} alt={producto.nombre} />
                </Link>
                  <h3>{producto.nombre}</h3>
                 <div className='acciones-producto'>
                  <h2 className='precio'> {producto.en_oferta === 1 ? formatoPrecio.format(producto.precio_oferta) : formatoPrecio.format(producto.precio)}</h2>
                  <button className="botones" onClick={() => disminuirCantidad(producto.id)}>-</button>
                  <p className="cantidad">{producto.cantidad}</p>
                  <button className="botones" onClick={() => aumentarCantidad(producto.id)}>+</button>
                  <span className="eliminar"><img onClick={() => eliminarProducto(producto.id)} src={borrar} alt="borrar" /></span>

                 </div>
                  
              </div>
            ))
          )}

        </div>

        <div className="totales">
          <p className="unidades">Productos Totales:{totalUnidades}</p>
          <p className="precio">Total Precio: ${totalPrecio.toLocaleString("es-CO")}</p>
          <button className="comprar" onClick={manejarPago} >Comprar💰</button>
          <button className="vaciar" onClick={vaciarCarrito}>Vaciar Carrito🗑️</button>
    
        </div>
      </div>

      

    </>
  );
}
