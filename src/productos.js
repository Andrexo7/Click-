const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// conexión directa (provisional mientras no usamos dotenv)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ProyectoSe2069',
  database: 'click&connect',
  port: 3307
});

// Obtener todos los productos para mostrarloss en shop y catalogo general
router.get("/", (req, res) => {
  connection.query("SELECT * FROM articulos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Obtener un producto por id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query("SELECT * FROM articulos WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Producto no encontrado" });

    res.json(results[0]);
  });
});

module.exports = router;
