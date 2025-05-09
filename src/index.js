// Archivo index.js simplificado
const express = require("express");
const mysql = require("mysql2");
const app = express();

// Configuración directa sin usar dotenv
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

app.get('/productos', (req, res) => {
  connection.query('SELECT * FROM articulo', (err, results) => {
    if (err) {
      console.error('Error en consulta:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Iniciar servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});