import React, { useState, useEffect } from 'react';
import usuario from '../assets/usuario.png';
import '../assets/css/Perfil.css';

function Perfil() {
  const [userData, setUserData] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Obtener datos del usuario
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      
      // Obtener pedidos del usuario
      fetch(`http://localhost:4000/pedidos?cliente_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setPedidos(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error al obtener pedidos:', err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div className="loading">Cargando perfil...</div>;
  }

  if (!userData) {
    return <div className="error">No se encontraron datos de usuario. Por favor inicia sesión.</div>;
  }

  return (
    <div className="contenedor">
      <div className="informacion-usuario">
        <img src={usuario} alt="Usuario" />
        <h3>🎊 Bienvenido, {userData.nombre.split(' ')[0]} 🎊</h3>
      </div>

      <div className="datos-personales">
        <h2>Datos Personales</h2>
        <div className="dato">
          <h3>Nombre</h3>
          <p>{userData.nombre}</p>
        </div>
        <div className="dato">
          <h3>Correo Electrónico</h3>
          <p>{userData.correo}</p>
        </div>
        <div className="dato">
          <h3>Celular</h3>
          <p>{userData.celular || 'No registrado'}</p>
        </div>
        <div className="dato">
          <h3>Dirección</h3>
          <p>{userData.direccion || 'No registrada'}</p>
        </div>
      </div>

      <div className="pedidos-recientes">
        <h2>Pedidos Recientes</h2>
        {pedidos.length > 0 ? (
          pedidos.map(pedido => (
            <div className="pedido" key={pedido.id}>
              <h3>Pedido #{pedido.id}</h3>
              <p><strong>Fecha:</strong> {new Date(pedido.fecha_pedido).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${pedido.precio_total?.toLocaleString() || '0'}</p>
              <p><strong>Estado:</strong> {pedido.estado || 'En proceso'}</p>
            </div>
          ))
        ) : (
          <p className="sin-pedidos">No hay pedidos recientes</p>
        )}
      </div>
    </div>
  );
}

export default Perfil;