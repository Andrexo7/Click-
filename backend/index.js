import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productosRoutes from './rutas/productos.js';
import rutasDePago from './rutas/rutasDePago.js'
import carritoRoutes from './rutas/carrito.js'
import db from './conexion.js'


const app = express();
dotenv.config();

app.use(cors({
  origin: "http://localhost:5173"
}));



// Configuración express
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('API funcionando. Visita /productos');
});


// Rutas de productos
app.use('/productos', productosRoutes);
//rutas para pagos
app.use('/pagos',rutasDePago)
//rutas para carrito
app.use('/carrito',carritoRoutes(db))



// Iniciar servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

