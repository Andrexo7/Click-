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

// Obtener todos los productos
router.get('/', (req, res) => {
  connection.query('SELECT * FROM articulos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM articulos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(results[0]);
  });
});

// Crear nuevo producto
router.post('/', (req, res) => {
  const { nombre, descripcion, precio, categoria, imagen, en_oferta, precio_oferta } = req.body;

  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ error: 'Nombre, precio y categoría son obligatorios' });
  }

  const query = `INSERT INTO articulos 
    (nombre, descripcion, precio, categoria, imagen, en_oferta, precio_oferta) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, 
    [nombre, descripcion, precio, categoria, imagen, en_oferta || 0, precio_oferta || null], 
    (err, result) => {
      if (err) {
        console.error('Error al insertar producto:', err.message);
        return res.status(500).json({ error: 'Error interno al guardar el producto' });
      }
      res.status(201).json({ mensaje: 'Producto creado', id: result.insertId });
    });
});

// Actualizar producto
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, categoria, imagen, en_oferta, precio_oferta } = req.body;

  if (!nombre || !precio || !categoria) {
    return res.status(400).json({ error: 'Nombre, precio y categoría son obligatorios' });
  }

  const query = `UPDATE articulos SET 
    nombre = ?, descripcion = ?, precio = ?, categoria = ?, imagen = ?, 
    en_oferta = ?, precio_oferta = ? 
    WHERE id = ?`;

  connection.query(query, 
    [nombre, descripcion, precio, categoria, imagen, en_oferta || 0, precio_oferta || null, id], 
    (err, result) => {
      if (err) {
        console.error('Error al actualizar producto:', err.message);
        return res.status(500).json({ error: 'Error interno al actualizar el producto' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ mensaje: 'Producto actualizado correctamente' });
    });
});

// Eliminar producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM articulos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto:', err.message);
      return res.status(500).json({ error: 'Error interno al eliminar el producto' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });
  });
});

export default router;