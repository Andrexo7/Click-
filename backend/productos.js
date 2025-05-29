const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

// conexión directa (provisional mientras no usamos dotenv)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
