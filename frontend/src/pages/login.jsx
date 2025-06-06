import React, { useState, useEffect } from 'react';
import '../assets/css/login.css';
import { useNavigate } from 'react-router-dom';
import newlogo from "../assets/newlogo.png";

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, [correo, contraseña]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
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
      
      // Guardar datos del usuario en localStorage
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('token', data.token || '');
      
      // Redirección según el rol
      navigate(data.user.rol === 'admin' ? '/admin' : '/shop');
      
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`login-container ${error ? 'blur-form' : ''}`}>
      <div className="logoi">
        <h2>Inicia sesión</h2>
        <img className='logo' src={newlogo} alt="Logo" />
      </div>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo:</label>
          <input 
            type="email" 
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
        <button 
          className="login-button" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>

      {error && (
        <>
          <div className="message-backdrop" onClick={() => setError('')}></div>
          <div className="login-message error-message">
            {error}
            <button className="close-message" onClick={() => setError('')}>×</button>
          </div>
        </>
      )}
      
      <p className="register-link">
        ¿No tienes cuenta? <a href="/register">Regístrate</a>
      </p>
    </div>
  );
};

export default Login;