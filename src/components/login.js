// Importamos React y el hook personalizado useAuth
import React, { useState } from 'react';
import './login.css';
import { useAuth } from '../context/RoleContext';
import { FaUser, FaLock, FaBriefcase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Definimos el componente Login como una función flecha
const Login = () => {
    // Obtenemos setUser del contexto para actualizar el estado del usuario
    const { setUser } = useAuth();
    // Estado local para manejar el rol del usuario, nombre y contraseña
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    // Función para manejar el inicio de sesión
    const handleLogin = () => {
      // Dependiendo del rol lo dirige a su pagina
      if (role && username && password) {
        // Actualiza el estado del usuario con el rol y el nombre de usuario
        setUser({ role, username });
        // Lógica de autenticación
        if (role === 'client') {
          navigate('/Home');
        } else if (role === 'admin' || role === 'employee') {
          navigate('/Home');
        }
      } else {
        alert('Por favor, completa todos los campos y selecciona un rol válido');
      }
    };
  
    return (
      <div className="fondo-wrapper">
        <div className="fondo">
          <div className='contenedor-form login'>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <h2>Iniciar sesión</h2>
              <div className="contenedor-input">
                <input 
                  type="text" 
                  placeholder='Username' 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
                <FaUser className='icono' />
              </div>
              <div className="contenedor-input">
                <input 
                  type="password" 
                  placeholder='Password' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <FaLock className='icono' />
              </div>
              <div className="contenedor-input">
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  required
                >
                  <option value="" disabled>Selecciona tu rol</option>
                  <option value="admin">Administrador</option>
                  <option value="employee">Empresa</option>
                  <option value="client">Cliente</option>
                </select>
                <FaBriefcase className='icono' />
              </div>
              <div className="recordar">
                <label><input type="checkbox" /> Recordar sesión</label>
              </div>
              <button type="submit" className="btn">Iniciar sesión</button>
              <div className="registro-link">
                <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
