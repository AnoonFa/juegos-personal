import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { usePageTitle } from '../../context/PageTitleContext'; 
import './ProfilePage.css'; 

const ProfilePage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    username: '',
    correo: '', // Aquí aseguramos que 'correo' está presente
    telefono: ''
  });
  const [newPassword, setNewPassword] = useState(''); // Para la nueva contraseña
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Perfil');

    const fetchUserData = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(`http://localhost:3000/users/${user.id}`);
          const userData = response.data;

          // Actualiza el estado con los datos del usuario
          setFormData({
            nombre: userData.nombre || '',
            username: userData.username || '',
            correo: userData.correo || '', // Asigna el valor de 'correo'
            telefono: userData.telefono || ''
          });
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      }
    };
    fetchUserData();
  }, [user, setTitle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword) {
      try {
        await axios.put(`http://localhost:3000/users/${user.id}`, {
          ...formData,
          contrasena: newPassword, // Actualizar la contraseña
        });
        alert('Contraseña actualizada exitosamente');
        setNewPassword(''); // Limpiar el campo de la nueva contraseña
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
      }
    } else {
      alert('Por favor, ingresa una nueva contraseña.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && user.id) {
      try {
        await axios.put(`http://localhost:3000/users/${user.id}`, formData);
        alert('Datos actualizados exitosamente');
      } catch (error) {
        console.error('Error al actualizar datos:', error);
      }
    }
  };

  return (
    <div className="profile-container">
      <h2>Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input 
            type="text" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            disabled
          />
        </div>
        <div className="form-group">
          <label>Nombre de usuario:</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Correo electrónico:</label>
          <input 
            type="email" 
            name="correo" 
            value={formData.correo} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input 
            type="text" 
            name="telefono" 
            value={formData.telefono} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Actualizar Datos</button>
      </form>

      <form onSubmit={handlePasswordChange} style={{ marginTop: '20px' }}>
        <div className="form-group">
          <label>Nueva Contraseña:</label>
          <input 
            type="password" 
            name="newPassword" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default ProfilePage;
