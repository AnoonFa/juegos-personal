import React, { useState } from 'react';
import './register.css';
import { FaUser, FaPhone, FaEnvelope, FaLock, FaBriefcase,} from "react-icons/fa";

const RegisterForm = () => {
  const [role, setRole] = useState('cliente');
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    contrasena: '',
    foto: null,
    huella: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Usuario registrado:
            \nNombre: ${formData.nombre}
            \nTeléfono: ${formData.telefono}
            \nCorreo: ${formData.correo}
            \nContraseña: ${formData.contrasena}
            \nRol: ${role}`);
    console.log(formData);
  };

  return (
    <div className="fondo-wrapper">
      <div className="fondo">
        <div className="contenedor-form">
          <h2>Registro</h2>
          <form onSubmit={handleSubmit}>
            <div className="contenedor-input">
              <select name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="" disabled>Selecciona tu rol</option>
                <option value="cliente">Cliente</option>
                <option value="empleado">Empresa</option>
                <option value="administrador">Administrador</option>
              </select>
              <FaBriefcase className='icono' />
            </div>
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
              <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} placeholder="Contraseña" required />
              <FaLock className='icono' />
            </div>
            <div className="upload-section">

            </div>
            <button type="submit" className="btn">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
