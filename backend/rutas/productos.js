// productos.js
import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

router.get('/', (req, res) => {
  connection.query('SELECT * FROM articulos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM articulos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { nombre, precio, categoria, imagen, descripcion } = req.body;

  if (!nombre || !precio || !categoria || !imagen || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }

  const query = `INSERT INTO articulos (nombre, precio, categoria, imagen, descripcion) VALUES (?, ?, ?, ?, ?)`;

  connection.query(query, [nombre, precio, categoria, imagen, descripcion], (err, result) => {
    if (err) {
      console.error('❌ Error al insertar producto:', err.message);
      return res.status(500).json({ error: 'Error interno al guardar el producto.' });
    }
    res.status(201).json({ mensaje: 'Producto creado', id: result.insertId });
  });
});



export default router;