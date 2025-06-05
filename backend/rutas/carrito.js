import { Router } from 'express';

export default (db) => {
  const router = Router();

  // Obtener o crear carrito
  router.post('/crear-o-obtener', (req, res) => {
    const { cliente_id } = req.body;

    if (!cliente_id && cliente_id !== 0) {
      return res.status(400).json({ error: 'cliente_id es requerido' });
    }

    db.query(
      'SELECT id FROM carrito_compras WHERE cliente_id = ? ORDER BY fecha_agregado DESC LIMIT 1',
      [cliente_id],
      (err, rows) => {
        if (err) {
          console.error('Error en crear-o-obtener:', err);
          return res.status(500).json({ error: err.message });
        }

        if (rows.length > 0) {
          res.json({ carrito_id: rows[0].id });
        } else {
          db.query(
            'INSERT INTO carrito_compras (cliente_id, fecha_agregado) VALUES (?, NOW())',
            [cliente_id],
            (err, result) => {
              if (err) {
                console.error('Error en crear-o-obtener:', err);
                return res.status(500).json({ error: err.message });
              }
              res.json({ carrito_id: result.insertId });
            }
          );
        }
      }
    );
  });

  // Agregar o actualizar producto en carrito
  router.post('/agregar-item', (req, res) => {
    const { carrito_id, articulo_id, cantidad } = req.body;

    if (!carrito_id || !articulo_id || !cantidad) {
      return res.status(400).json({ error: 'carrito_id, articulo_id y cantidad son requeridos' });
    }

    db.query(
      'SELECT id, cantidad FROM carrito_items WHERE carrito_id = ? AND articulo_id = ?',
      [carrito_id, articulo_id],
      (err, rows) => {
        if (err) {
          console.error('Error en agregar OTA:', err);
          return res.status(500).json({ error: err.message });
        }

        if (rows.length > 0) {
          db.query(
            'UPDATE carrito_items SET cantidad = cantidad + ? WHERE id = ?',
            [cantidad, rows[0].id],
            (err) => {
              if (err) {
                console.error('Error en actualizar-item:', err);
                return res.status(500).json({ error: err.message });
              }
              res.sendStatus(200);
            }
          );
        } else {
          db.query(
            'INSERT INTO carrito_items (carrito_id, articulo_id, cantidad, fecha_agregado) VALUES (?, ?, ?, NOW())',
            [carrito_id, articulo_id, cantidad],
            (err) => {
              if (err) {
                console.error('Error en insertar-item:', err);
                return res.status(500).json({ error: err.message });
              }
              res.sendStatus(200);
            }
          );
        }
      }
    );
  });

  // Obtener productos del carrito
  router.get('/:carrito_id/items', (req, res) => {
    const { carrito_id } = req.params;

    db.query(
      `SELECT ci.id, ci.articulo_id, ci.cantidad, a.nombre, a.precio
       FROM carrito_items ci
       JOIN articulos a ON ci.articulo_id = a.id
       WHERE ci.carrito_id = ?`,
      [carrito_id],
      (err, rows) => {
        if (err) {
          console.error('Error en obtener-items:', err);
          return res.status(500).json({ error: err.message });
        }
        res.json(rows);
      }
    );
  });

  router.delete('/eliminar-item/:item_id', (req, res) => {
  const { item_id } = req.params;

  db.query(
    'DELETE FROM carrito_items WHERE id = ?',
    [item_id],
    (err) => {
      if (err) {
        console.error('Error al eliminar item:', err);
        return res.status(500).json({ error: err.message });
      }
      res.sendStatus(200);
    }
  );
});

router.delete('/vaciar/:carrito_id', (req, res) => {
  const { carrito_id } = req.params;

  db.query(
    'DELETE FROM carrito_items WHERE carrito_id = ?',
    [carrito_id],
    (err) => {
      if (err) {
        console.error('Error al vaciar carrito:', err);
        return res.status(500).json({ error: err.message });
      }
      res.sendStatus(200);
    }
  );
});


router.put('/actualizar-item/:item_id', (req, res) => {
  const { item_id } = req.params;
  const { cantidad } = req.body;

  if (cantidad < 1) {
    return res.status(400).json({ error: 'Cantidad inválida' });
  }

  db.query(
    'UPDATE carrito_items SET cantidad = ? WHERE id = ?',
    [cantidad, item_id],
    (err) => {
      if (err) {
        console.error('Error al actualizar cantidad:', err);
        return res.status(500).json({ error: err.message });
      }
      res.sendStatus(200);
    }
  );
});


  return router;
};
