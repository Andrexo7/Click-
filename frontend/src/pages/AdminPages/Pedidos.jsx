import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import AdminBar from '../../components/AdminBar';
import './Pedidos.css';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [articulosPedido, setArticulosPedido] = useState([]);
  const [loadingArticulos, setLoadingArticulos] = useState(false);

  const fetchPedidos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/pedidos');
      if (!response.ok) {
        throw new Error('Error al cargar pedidos');
      }
      const data = await response.json();
      setPedidos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticulosPedido = async (pedidoId) => {
    setLoadingArticulos(true);
    try {
      const response = await fetch(`http://localhost:4000/pedidos/${pedidoId}/articulos`);
      if (!response.ok) {
        throw new Error('Error al cargar artículos del pedido');
      }
      const data = await response.json();
      setArticulosPedido(data);
      setPedidoSeleccionado(pedidoId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingArticulos(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="main-content">
        <AdminBar />
        
        <div className="content-wrapper">
          <div className="pedidos-container">
            <h1>Administración de Pedidos</h1>
            <button onClick={fetchPedidos} className="refresh-button">
              Actualizar Lista
            </button>
            
            {loading && <div className="loading">Cargando pedidos...</div>}
            {error && <div className="error">Error: {error}</div>}
            
            {!loading && !error && (
              <div className="pedidos-grid">
                <table className="pedidos-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Total</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map((pedido) => (
                      <tr key={pedido.id} className={pedidoSeleccionado === pedido.id ? 'selected' : ''}>
                        <td>{pedido.id}</td>
                        <td>{new Date(pedido.fecha_pedido).toLocaleString()}</td>
                        <td>
                          <div className="cliente-info">
                            <div className="cliente-nombre">{pedido.cliente_nombre}</div>
                            <div className="cliente-contacto">
                              <span>{pedido.cliente_correo}</span>
                              <span>{pedido.cliente_celular}</span>
                            </div>
                          </div>
                        </td>
                        <td>${Number(pedido.precio_total || 0).toFixed(2)}</td>
                        <td>
                          <button 
                            onClick={() => fetchArticulosPedido(pedido.id)}
                            className="btn-detalles"
                          >
                            Ver Detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {pedidoSeleccionado && (
                  <div className="articulos-container">
                    <h3>Artículos del Pedido #{pedidoSeleccionado}</h3>
                    {loadingArticulos ? (
                      <div className="loading">Cargando artículos...</div>
                    ) : (
                      <table className="articulos-table">
                        <thead>
                          <tr>
                            <th>Artículo</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {articulosPedido.map((articulo) => (
                            <tr key={`${articulo.pedido_id}-${articulo.articulo_id}`}>
                              <td>
                                <div className="articulo-info">
                                  {articulo.articulo_imagen && (
                                    <img 
                                      src={articulo.articulo_imagen} 
                                      alt={articulo.articulo_nombre} 
                                      className="articulo-imagen"
                                    />
                                  )}
                                  <span>{articulo.articulo_nombre}</span>
                                </div>
                              </td>
                              <td>{articulo.cantidad}</td>
                              <td>${Number(articulo.precio_unitario || 0).toFixed(2)}</td>
                              <td>${(Number(articulo.cantidad || 0) * Number(articulo.precio_unitario || 0)).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pedidos;