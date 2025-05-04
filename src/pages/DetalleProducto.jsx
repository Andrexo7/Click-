import { useParams } from "react-router-dom";
import productos from "../data/productos";
import '../assets/css/DetalleProducto.css'

function DetalleProducto({ agregarAlCarrito }) {
    const { id } = useParams();
    const producto = productos.find((p) => p.id === parseInt(id));

    if (!producto) return <p>Producto no encontrado</p>;

    return (

        <div className="App">
            <div className="details">
                <div className="big-img">
                    <img src={producto.img} alt={producto.nombre} />
                </div>


                <div className="box">
                    <div className="row">
                    <h2>{producto.nombre}</h2>
                    </div>

                    <p className="Descripcion">{producto.Descripcion}</p>
                    <span>Precio: ${producto.precio.toLocaleString("es-CO")}</span>
                    <button className="cart" onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>

                </div>

            </div>




        </div>



    );
}

export default DetalleProducto;
