import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import AdminBar from '../../components/AdminBar';
import './AdminProductos.css';

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoActual, setProductoActual] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagen: '',
    en_oferta: false,
    precio_oferta: ''
  });

  const fetchProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/productos');
      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }
      const data = await response.json();
      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const abrirModalNuevo = () => {
    setProductoActual({
      id: '',
      nombre: '',
      descripcion: '',
      precio: '',
      categoria: '',
      imagen: '',
      en_oferta: false,
      precio_oferta: ''
    });
    setModoEdicion(false);
    setModalAbierto(true);
  };

  const abrirModalEditar = (producto) => {
    setProductoActual({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      imagen: producto.imagen,
      en_oferta: producto.en_oferta === 1,
      precio_oferta: producto.precio_oferta || ''
    });
    setModoEdicion(true);
    setModalAbierto(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductoActual({
      ...productoActual,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = modoEdicion 
      ? `http://localhost:4000/productos/${productoActual.id}`
      : 'http://localhost:4000/productos';
    
    const method = modoEdicion ? 'PUT' : 'POST';
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productoActual,
          en_oferta: productoActual.en_oferta ? 1 : 0,
          precio_oferta: productoActual.en_oferta ? productoActual.precio_oferta : null
        })
      });

      if (!response.ok) {
        throw new Error(`Error al ${modoEdicion ? 'actualizar' : 'crear'} producto`);
      }

      setModalAbierto(false);
      fetchProductos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/productos/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar producto');
      }

      fetchProductos();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="main-content">
        <AdminBar />
        
        <div className="content-wrapper">
          <div className="productos-container">
            <h1>Administrar Productos</h1>
            
            <div className="productos-header">
              <button onClick={abrirModalNuevo} className="btn-agregar">
                + Agregar Producto
              </button>
              <button onClick={fetchProductos} className="refresh-button">
                Actualizar Lista
              </button>
            </div>
            
            {loading && <div className="loading">Cargando...</div>}
            {error && <div className="error">Error: {error}</div>}
            
            {!loading && !error && (
              <table className="productos-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th>Oferta</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio}</td>
                      <td>{producto.categoria}</td>
                      <td>{producto.en_oferta ? 'Sí' : 'No'}</td>
                      <td className="acciones">
                        <button 
                          onClick={() => abrirModalEditar(producto)}
                          className="btn-editar"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleEliminar(producto.id)}
                          className="btn-eliminar"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal para agregar/editar */}
      {modalAbierto && (
        <div className="modal">
          <div className="modal-contenido">
            <span className="cerrar-modal" onClick={() => setModalAbierto(false)}>&times;</span>
            <h2>{modoEdicion ? 'Editar Producto' : 'Agregar Producto'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={productoActual.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Descripción:</label>
                <textarea
                  name="descripcion"
                  value={productoActual.descripcion}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label>Precio:</label>
                <input
                  type="number"
                  step="0.01"
                  name="precio"
                  value={productoActual.precio}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Categoría:</label>
                <input
                  type="text"
                  name="categoria"
                  value={productoActual.categoria}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>URL de la imagen:</label>
                <input
                  type="text"
                  name="imagen"
                  value={productoActual.imagen}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="en_oferta"
                    checked={productoActual.en_oferta}
                    onChange={handleInputChange}
                  />
                  En oferta
                </label>
              </div>
              
              {productoActual.en_oferta && (
                <div className="form-group">
                  <label>Precio de oferta:</label>
                  <input
                    type="number"
                    step="0.01"
                    name="precio_oferta"
                    value={productoActual.precio_oferta}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              
              <button type="submit" className="btn-guardar">
                {modoEdicion ? 'Actualizar' : 'Guardar'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductos;