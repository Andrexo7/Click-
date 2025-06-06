import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import AdminBar from '../../components/AdminBar';
import './Clientes.css';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingRol, setEditingRol] = useState(null);
  const [nuevoRol, setNuevoRol] = useState('');

  const fetchClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/clientes');
      if (!response.ok) {
        throw new Error('Error al cargar clientes');
      }
      const data = await response.json();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarCliente = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/clientes/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar cliente');
      }

      fetchClientes();
    } catch (err) {
      setError(err.message);
    }
  };

  const iniciarEdicionRol = (cliente) => {
    setEditingRol(cliente.id);
    setNuevoRol(cliente.rol);
  };

  const cancelarEdicionRol = () => {
    setEditingRol(null);
    setNuevoRol('');
  };

  const guardarRol = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/clientes/${id}/rol`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rol: nuevoRol })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el rol');
      }

      setEditingRol(null);
      fetchClientes();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="main-content">
        <AdminBar />
        
        <div className="content-wrapper">
          <div className="clientes-container">
            <h1>Lista de Clientes</h1>
            <button onClick={fetchClientes} className="refresh-button">
              Actualizar Lista
            </button>
            
            {loading && <div className="loading">Cargando...</div>}
            {error && <div className="error">Error: {error}</div>}
            
            {!loading && !error && (
              <table className="clientes-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Celular</th>
                    <th>Dirección</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.id}</td>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.correo}</td>
                      <td>{cliente.celular}</td>
                      <td>{cliente.direccion}</td>
                      <td>
                        {editingRol === cliente.id ? (
                          <select
                            value={nuevoRol}
                            onChange={(e) => setNuevoRol(e.target.value)}
                            className="rol-select"
                          >
                            <option value="admin">Admin</option>
                            <option value="cliente">Cliente</option>
                            {/* Agrega más roles si es necesario */}
                          </select>
                        ) : (
                          cliente.rol
                        )}
                      </td>
                      <td className="acciones">
                        {editingRol === cliente.id ? (
                          <>
                            <button 
                              onClick={() => guardarRol(cliente.id)}
                              className="btn-guardar"
                            >
                              Guardar
                            </button>
                            <button 
                              onClick={cancelarEdicionRol}
                              className="btn-cancelar"
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => iniciarEdicionRol(cliente)}
                              className="btn-editar"
                            >
                              Editar Rol
                            </button>
                            <button 
                              onClick={() => handleEliminarCliente(cliente.id)}
                              className="btn-eliminar"
                            >
                              Eliminar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clientes;