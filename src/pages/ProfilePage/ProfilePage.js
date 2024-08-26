import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { usePageTitle } from '../../context/PageTitleContext'; // Importar el contexto del título
import './ProfilePage.css'; 

const ProfilePage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    telefono: ''
  });
  const { setTitle } = usePageTitle(); // Obtener la función para establecer el título

  useEffect(() => {
    setTitle('Perfil'); // Establecer el título de la página

    const fetchUserData = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(`http://localhost:3000/users/${user.id}`);
          setFormData(response.data);
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
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            disabled 
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
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default ProfilePage;
