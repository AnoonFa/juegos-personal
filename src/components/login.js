import React, { useEffect, useState } from 'react';
import './login.css';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePageTitle } from '../context/PageTitleContext';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Login = () => {
  const { setUser } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [contrasena, setContrasena] = useState(''); 
  const [alertMessage, setAlertMessage] = useState(''); // Estado para el mensaje de alerta
  const [alertType, setAlertType] = useState(''); // Estado para el tipo de alerta (success/error)
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Iniciar Sesión'); 
  }, [setTitle]);

  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users`);
      const user = response.data.find(
        (user) =>
          (user.username === identifier || user.correo === identifier) &&
          user.contrasena === contrasena
      );

      if (user) {
        setUser(user);
        setAlertMessage('Inicio de sesión exitoso');
        setAlertType('success');

        // Redireccionar después de un breve tiempo
        setTimeout(() => {
          if (user.role === 'administrador') {
            navigate('/admin');
          } else {
            navigate('/home');
          }
        }, 1500);
      } else {
        throw new Error('Usuario no encontrado o contraseña incorrecta');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setAlertMessage('Error en el inicio de sesión: ' + error.message);
      setAlertType('error');
    }
  };

  return (
    <div className="fondo-wrapper">
      <div className="fondo">
        <div className="contenedor-form login">
          {/* Alerta */}
          {alertMessage && (
            <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
              <Alert severity={alertType} onClose={() => setAlertMessage('')}>
                {alertMessage}
              </Alert>
            </Stack>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <h2>Iniciar sesión</h2>
            <div className="contenedor-input">
              <input 
                type="text" 
                placeholder='Correo o Username' 
                value={identifier} 
                onChange={(e) => setIdentifier(e.target.value)} 
                required 
              />
              <FaUser className='icono' />
            </div>
            <div className="contenedor-input">
              <input 
                type="password" 
                placeholder='Contraseña' 
                value={contrasena} 
                onChange={(e) => setContrasena(e.target.value)} 
                required 
              />
              <FaLock className='icono' />
            </div>
            <div className="recordar">
              <label><input type="checkbox" /> Recordar sesión</label>
            </div>
            <button type="submit" className="btn">Iniciar sesión</button>
            <div className="registro-link">
              <p className='notiene'>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
