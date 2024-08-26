import React, { useEffect, useState } from 'react';
import './register.css';
import { FaUser, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../context/PageTitleContext';



const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    username: '',
    contrasena: '',
  });

  const navigate = useNavigate();
  const { setTitle } = usePageTitle();


  useEffect(() => {
    setTitle('Registro'); // Establecer el título de la página
  }, [setTitle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/register', formData);

      if (response.status === 201) {
        alert('Registro exitoso. Puedes iniciar sesión ahora.');
        navigate('/login');
      } else {
        throw new Error('Error en el registro');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro: ' + error.message);
    }
  };
const ExamplePage = () => {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Título de la Página');
  }, [setTitle]);
};
  return (
    <div className="fondo-wrapper">
      <div className="fondo">
        <div className="contenedor-form">
          <h2>Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="contenedor-input">
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
              <FaUser className='icono' />
            </div>
            <div className="contenedor-input">
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" required />
              <FaPhone className='icono' />
            </div>
            <div className="contenedor-input">
              <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo" required />
              <FaEnvelope className='icono' />
            </div>
            <div className="contenedor-input">
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
              <FaUser className='icono' />
            </div>
            <div className="contenedor-input">
              <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} placeholder="Contraseña" required />
              <FaLock className='icono' />
            </div>
            <button type="submit" className="btn">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

