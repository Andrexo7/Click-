const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

// conexión 
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    return;
  }
  console.log('✅ Conexión a MySQL establecida correctamente');
});

// Configuración express
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('API funcionando. Visita /productos');
});

// Rutas de productos
const productosRoutes = require('./productos');
app.use('/productos', productosRoutes);




// Iniciar servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});


