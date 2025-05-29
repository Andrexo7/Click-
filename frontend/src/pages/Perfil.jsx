import React from 'react';
import usuario from '../assets/usuario.png';
import '../assets/css/Perfil.css';

function Perfil() {
  return (
    <div className="contenedor">
      <div className="informacion-usuario">
        <img src={usuario} alt="Usuario" />
        <h3>🎊 Bienvenido, Andrés 🎊</h3>
      </div>

      <div className="datos-personales">
        <h2>Datos Personales</h2>
        <h3>Nombre</h3>
        <p>Andrés Felipe Moreno Piedrahita</p>
        <h3>Correo Electrónico</h3>
        <p>feliandresmorepi@gmail.com</p>
        <h3>Celular</h3>
        <p>302000000</p>
        <h3>Dirección</h3>
        <p>Carrera 00 # 00 B 0 Norte</p>
      </div>

      <div className="pedidos-recientes">
        <h2>Pedidos Recientes</h2>
        <div className="pedido">
          <h3>Pedido #748239</h3>
          <p>Fecha del pedido: [Fecha]</p>
          <img src={''} alt="Producto" />
          <p>Nombre del producto: [Producto]</p>
          <p>Estado del pedido: Entregado</p>
          <p>Total: $1,891,380</p>
        </div>
      </div>
    </div>
  );
}

export default Perfil;