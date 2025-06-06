import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/register.css'

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [message, setMessage] = useState('');
  const [correo, setCorreo]= useState('')
  const [celular, setCelular]=useState('')
  const [direccion,setDireccion]=useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, contraseña, correo, celular,direccion }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar');
      }
      setMessage(data.message);
      setTimeout(() => {
      navigate('/');
    }, 3000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className='register-container"'>
      <h2>Registrate en en click&connect</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Correo</label>
          <input type="email"value={correo}onChange={(e) => setCorreo(e.target.value)}/>
        </div>
        <div className="form-group">
          <label >Celular</label>
          <input type="number" value={celular} onChange={(e) => setCelular(e.target.value)}/>
        </div>

        <div className="form-group">
          <label >Direccion</label>
           <input type="text"value={direccion}onChange={(e) => setDireccion(e.target.value)}/>
        </div>
       

        

        <button className="register-button" type="submit">Registrarse</button>
      </form>
    {message && (
      <>
        <div className="message-backdrop"></div>
        <div className={`register-message ${
          message.includes('Error') ? 'error-message' : 'success-message'
        }`}>
          {message}
        </div>
      </>
    )}
      <p className="login-link">¿Ya tienes cuenta? <a href="/">Inicia sesión</a></p>
    </div>
  );
};

export default Register;