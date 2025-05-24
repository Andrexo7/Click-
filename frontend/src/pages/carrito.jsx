import { Link } from 'react-router-dom';
import '../assets/css/carrito.css';
import borrar from "../assets/borrar.png"
import vacio from "../assets/carritoVacio.png"

export default function Carrito({ carrito,vaciarCarrito,aumentarCantidad,disminuirCantidad,eliminarProducto }) {

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + Number(item.precio)  * item.cantidad, 0);


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
                <h2 className="precio">Precio: ${Number(producto.precio).toLocaleString("es-CO")}</h2>
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
          <button className="comprar" >Comprar💰</button>
          <button className="vaciar" onClick={vaciarCarrito}>Vaciar Carrito🗑️</button>
    
        </div>
      </div>

      

    </>
  );
}
