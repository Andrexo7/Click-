import React, { useState, useEffect } from 'react';
import '../assets/css/login.css';
import { useNavigate } from 'react-router-dom';
import newlogo from "../assets/newlogo.png";

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(''); // Cambiado de message a error
  const navigate = useNavigate();

  // Limpiar el error cuando se modifican los campos
  useEffect(() => {
    setError('');
  }, [correo, contraseña]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contraseña }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }
      
      localStorage.setItem('rol', data.rol);
      
      // Redirección 
      if (data.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/shop');
      }
      
    } catch (error) {
      setError(error.message);
      
      // Limpiar el error
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <div className={`login-container ${error ? 'blur-form' : ''}`}>
      
      <div className="logoi">
        <h2>Inicia sesion</h2>
        <img className='logo' src={newlogo} alt="" />
      </div>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo:</label>
          <input 
            type="text" 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={contraseña} 
            onChange={(e) => setContraseña(e.target.value)} 
            required 
          />
        </div>
        <button className="login-button" type="submit">Iniciar sesión</button>
      </form>

      {error && (
        <>
          <div 
            className="message-backdrop" 
            onClick={() => setError('')}
          ></div>
          <div className="login-message error-message">
            {error}
            <button 
              className="close-message" 
              onClick={() => setError('')}
            >×</button>
          </div>
        </>
      )}
      <p className="register-link">¿No tienes cuenta? <a href="/register">Regístrate</a></p>
    </div>
  );
};

export default Login;