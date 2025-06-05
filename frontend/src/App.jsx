import React, {useState,useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";


function App() {

  const [carrito, setCarrito] = useState(() => {
  const guardado = localStorage.getItem("carrito");
  try {
    return guardado ? JSON.parse(guardado) : [];
  } catch (e) {
    console.error("Error al cargar carrito desde localStorage:", e);
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}, [carrito]);

useEffect(() => {
  const obtenerOCrearCarrito = async () => {
    const cliente_id = 1; // Puedes reemplazarlo con el ID real del usuario si tienes login
    try {
      const res = await fetch('http://localhost:4000/carrito/crear-o-obtener', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente_id }),
      });
      const data = await res.json();
      localStorage.setItem("carrito_id", data.carrito_id);
    } catch (error) {
      console.error("Error al obtener o crear carrito:", error);
    }
  };

  obtenerOCrearCarrito();
}, []);




  const agregarAlCarrito = async (producto) => {
  const carrito_id = localStorage.getItem("carrito_id");

  if (!carrito_id) {
    console.error("No se encontró carrito_id en localStorage");
    return;
  }

  try {
    await fetch("http://localhost:4000/carrito/agregar-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        carrito_id: parseInt(carrito_id),
        articulo_id: producto.id,
        cantidad: 1,
      }),
    });

    // Puedes comentarlo si prefieres cargar siempre desde BD
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
  }

};

  
  const vaciarCarrito = async () => {
  const carrito_id = localStorage.getItem("carrito_id");

  try {
    await fetch(`http://localhost:4000/carrito/vaciar/${carrito_id}`, {
      method: "DELETE"
    });
    setCarrito([]);
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
  }
};


  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const aumentarCantidad = async (articulo_id) => {
  const item = carrito.find(item => item.id === articulo_id);
  if (!item) {
    console.error('Item not found in carrito:', articulo_id);
    return;
  }

  const nuevaCantidad = item.cantidad + 1;

  try {
    const response = await fetch(`http://localhost:4000/carrito/actualizar-item/${articulo_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad: nuevaCantidad })
    });


    setCarrito(carrito.map(i =>
      i.id === articulo_id ? { ...i, cantidad: nuevaCantidad } : i
    ));
  } catch (error) {
    console.error('Error al aumentar cantidad:', error);
  }
};
  
  const disminuirCantidad = async (articulo_id) => {
  const item = carrito.find(item => item.id === articulo_id);
  if (!item || item.cantidad <= 1) return;

  const nuevaCantidad = item.cantidad - 1;

  try {
    await fetch(`http://localhost:4000/carrito/actualizar-item/${item.item_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad: nuevaCantidad })
    });

    setCarrito(carrito.map(i =>
      i.id === articulo_id ? { ...i, cantidad: nuevaCantidad } : i
    ));
  } catch (error) {
    console.error("Error al disminuir cantidad:", error);
  }
};

  
 const eliminarProducto = async (articulo_id) => {
  const producto = carrito.find(item => item.id === articulo_id);
  if (!producto) return;

  try {
    await fetch(`http://localhost:4000/carrito/eliminar-item/${producto.item_id}`, {
      method: "DELETE"
    });

    setCarrito(carrito.filter(item => item.id !== articulo_id));
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
  }
};



  useEffect(() => {
    const cargarCarritoDesdeBD = async () => {
      const carrito_id = localStorage.getItem("carrito_id");
      if (!carrito_id) return;

      try {
        const res = await fetch(`http://localhost:4000/carrito/${carrito_id}/items`);
        const data = await res.json();
        setCarrito(data.map(item => ({
          id: item.articulo_id,
          item_id: item.id, // 💡 lo que necesitas para eliminar
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
          imagen: item.imagen
        })));
      } catch (error) {
        console.error("Error al cargar carrito desde la BD:", error);
      }
    };

    cargarCarritoDesdeBD();
  }, []);

  

   

  return (
    <BrowserRouter>
      <Navbar contador={totalProductos}/>
      <AppRoutes agregarAlCarrito={agregarAlCarrito} carrito={carrito} vaciarCarrito={vaciarCarrito}
      aumentarCantidad={aumentarCantidad} disminuirCantidad={disminuirCantidad} eliminarProducto={eliminarProducto} />
    </BrowserRouter>
  );
}

export default App;