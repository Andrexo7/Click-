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
    const { nombre, contraseña, correo, celular, direccion } = req.body;
    const rol = 'cliente'; // Rol predeterminado para nuevos usuarios

    const query = 'INSERT INTO clientes (nombre, contraseña, rol, correo, celular, direccion) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre, contraseña, rol, correo,celular, direccion], (err, result) => {
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
    const { correo, contraseña } = req.body;

    const query = 'SELECT * FROM clientes WHERE correo = ? AND contraseña = ?';
    db.query(query, [correo, contraseña], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error en el servidor' });
            return;
        }
        if (results.length > 0) {
            const user = results[0];
            res.status(200).json({ message: 'Login exitoso', rol: user.rol });
        } else {
            res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
    });
});

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
    const query = 'SELECT id, nombre, correo, celular, direccion, rol FROM clientes';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al obtener clientes' });
            return;
        }
        res.status(200).json(results);
    });
});

// Ruta para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM clientes WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al eliminar cliente' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Cliente no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    });
});

// Ruta para actualizar el rol de un cliente
app.put('/clientes/:id/rol', (req, res) => {
    const { id } = req.params;
    const { rol } = req.body;

    if (!rol) {
        return res.status(400).json({ message: 'El rol es requerido' });
    }

    const query = 'UPDATE clientes SET rol = ? WHERE id = ?';
    
    db.query(query, [rol, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al actualizar el rol' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Cliente no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Rol actualizado exitosamente' });
    });
});

// Añade estas rutas para manejar pedidos
app.get('/pedidos', (req, res) => {
    const query = `
        SELECT p.id, p.fecha_pedido, p.precio_total, 
               c.nombre as cliente_nombre, c.correo as cliente_correo, c.celular as cliente_celular
        FROM pedidos p
        JOIN clientes c ON p.cliente_id = c.id
        ORDER BY p.fecha_pedido DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al obtener pedidos' });
            return;
        }
        res.status(200).json(results);
    });
});

app.get('/pedidos/:id/articulos', (req, res) => {
    const { id } = req.params;
    
    const query = `
        SELECT ap.*, a.nombre as articulo_nombre, a.imagen as articulo_imagen
        FROM articulos_pedidos ap
        JOIN articulos a ON ap.articulo_id = a.id
        WHERE ap.pedido_id = ?
    `;
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al obtener artículos del pedido' });
            return;
        }
        res.status(200).json(results);
    });
});


// Iniciar servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

