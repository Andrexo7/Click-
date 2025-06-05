import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productosRoutes from './rutas/productos.js';
import rutasDePago from './rutas/rutasDePago.js'
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

// Ruta para registro
app.post('/register', (req, res) => {
    const { nombre, contraseña, correo } = req.body;
    const rol = 'cliente'; // Rol predeterminado para nuevos usuarios

    const query = 'INSERT INTO clientes (nombre, contraseña, rol, correo) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, contraseña, rol, correo], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al registrar usuario' });
            return;
        }
        res.status(201).json({ message: 'Registro exitoso' });
    });
});

// Ruta para login
app.post('/login', (req, res) => {
    const { nombre, contraseña } = req.body;

    const query = 'SELECT * FROM clientes WHERE nombre = ? AND contraseña = ?';
    db.query(query, [nombre, contraseña], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error en el servidor' });
            return;
        }
        if (results.length > 0) {
            const user = results[0];
            res.status(200).json({ message: 'Login exitoso', rol: user.rol });
        } else {
            res.status(401).json({ message: 'Nombre o contraseña incorrectos' });
        }
    });
});


// Iniciar servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

