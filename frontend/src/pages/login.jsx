import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function login() {
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [modo, setModo] = useState(usuario ? 'tienda' : 'login');

  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');

  const manejarRegistro = (e) => {
    e.preventDefault();
    const nuevoUsuario = { correo: nuevoCorreo, contraseña: nuevaContraseña };
    localStorage.setItem('user', JSON.stringify(nuevoUsuario));
    alert('Usuario registrado con éxito');
    setModo('login');
  };

 const manejarLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.correo === correo && user.contraseña === contraseña) {
      setUsuario(user);
      useNavigate('/shop');
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setModo('login');
  };

  return (
    <div>
      {modo === 'login' && (
        <div>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={manejarLogin}>
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
            <button type="submit">Ingresar</button>
          </form>
          <p>¿No tienes cuenta? <button onClick={() => setModo('registro')}>Regístrate aquí</button></p>
        </div>
      )}

      {modo === 'registro' && (
        <div>
          <h2>Registro</h2>
          <form onSubmit={manejarRegistro}>
            <input
              type="email"
              placeholder="Correo"
              value={nuevoCorreo}
              onChange={(e) => setNuevoCorreo(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={nuevaContraseña}
              onChange={(e) => setNuevaContraseña(e.target.value)}
              required
            />
            <button type="submit">Registrarse</button>
          </form>
          <p>¿Ya tienes cuenta? <button onClick={() => setModo('login')}>Inicia sesión</button></p>
        </div>
      )}

      {modo === 'tienda' && usuario && (
        <div>
          <h2>Bienvenido, {usuario.correo}</h2>
          <p>🎉 Aquí va el contenido de la tienda.</p>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}

export default login;