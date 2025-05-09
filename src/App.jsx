import React, {useState} from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import productos from "./data/productos";


function App() {

  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito=(producto) =>{
    const productoExistente =carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(carritoActualizado);
    }else{
      setCarrito([...carrito, {...producto, cantidad: 1 }]);
    }
  };
  
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const aumentarCantidad = (id) => {
    setCarrito(carrito.map(item =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    ));
  };
  
  const disminuirCantidad = (id) => {
    setCarrito(carrito.map(item =>
      item.id === id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    ).filter(item => item.cantidad > 0)); 
  };
  
  const eliminarProducto = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };
  

   

  return (
    <BrowserRouter>
      <Navbar contador={totalProductos}/>
      <AppRoutes agregarAlCarrito={agregarAlCarrito} carrito={carrito} vaciarCarrito={vaciarCarrito}
      aumentarCantidad={aumentarCantidad} disminuirCantidad={disminuirCantidad} eliminarProducto={eliminarProducto}  />
    </BrowserRouter>
  );
}

export default App;