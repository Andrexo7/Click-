const express = require("express");
const mysql = require("mysql2");
const app = express();

const cors = require("cors");
app.use(cors({
  origin:["http://localhost:5173","http://localhost:5173/"]
}));

// conexión directa (provisional mientras no usamos dotenv)
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'ProyectoSe2069',
  database: 'click&connect',
  port: 3307
};

// Crear conexión
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect(err => {
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


