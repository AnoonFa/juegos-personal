import React, { useEffect, useState } from 'react';
import './login.css';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePageTitle } from '../context/PageTitleContext';

const Login = () => {
  const { setUser } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Iniciar Sesión'); // Establecer el título de la página
  }, [setTitle]);


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users', {
        identifier,
        password,
      });

      if (response.data) {
        setUser(response.data);
        if (response.data.role === 'administrador') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Error en el inicio de sesión: ' + error.message);
    }
  };

  return (
    <div className="fondo-wrapper">
      <div className="fondo">
        <div className="contenedor-form login">
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
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
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
