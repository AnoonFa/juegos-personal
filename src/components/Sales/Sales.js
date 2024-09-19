import React, { useState, useContext, useEffect } from 'react';
import { GamesContext } from '../../context/GameContext';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Sales.css';
import UserGames from './UserGames';
import { Alert, Stack } from '@mui/material';  // Importar Alert y Stack de MUI

const Sales = () => {
  const { games, setGames, updateGameLicenses } = useContext(GamesContext);
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Rompecabezas');
  const [size, setSize] = useState(1);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [logoUrl, setLogoUrl] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState(['', '', '', '']);
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoDuration, setPromoDuration] = useState(0);
  const [errors, setErrors] = useState({});
  
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    if (!user) {
      console.error('User not found or not authenticated.');
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'El nombre es obligatorio.';
    if (!category) newErrors.category = 'La categoría es obligatoria.';
    if (size <= 0) newErrors.size = 'El tamaño debe ser mayor a 0.';
    if (price <= 0) newErrors.price = 'El precio debe ser mayor a 0.';
    if (quantity <= 0) newErrors.quantity = 'La cantidad debe ser mayor a 0.';
    if (!logoUrl) newErrors.logoUrl = 'La URL del logo es obligatoria.';
    if (!coverImageUrl) newErrors.coverImageUrl = 'La URL de la portada es obligatoria.';
    if (imageUrls.some(url => !url)) newErrors.imageUrls = 'Todas las imágenes del juego son obligatorias.';
    if (!description) newErrors.description = 'La descripción es obligatoria.';
    if (discount < 0 || discount > 100) newErrors.discount = 'El descuento debe estar entre 0 y 100.';
    if (promoDuration < 0) newErrors.promoDuration = 'La duración de la promoción no puede ser negativa.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSell = async () => {
    if (!validateForm()) return;

    if (!user || !user.id) {
      setAlertMessage('Debes estar autenticado para vender juegos.');
      setAlertType('error');
      return;
    }

    const existingGame = games.find(game => game.name.toLowerCase() === name.toLowerCase() && game.sellerId === user.id);
    if (existingGame) {
      try {
        await axios.put(`http://localhost:3000/games/${existingGame.id}`, {
          licensesAvailable: existingGame.licensesAvailable + quantity,
          licensesSold: existingGame.licensesSold,
          logoUrl,
          coverImageUrl,
          imageUrls,
        });

        updateGameLicenses(existingGame.id, quantity, false);
        setAlertMessage('Licencias añadidas al juego existente!');
        setAlertType('success');
      } catch (error) {
        setAlertMessage('Error al actualizar el juego existente.');
        setAlertType('error');
        console.error('Error al actualizar el juego existente:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/games', {
          name,
          category,
          size,
          price,
          licensesAvailable: quantity,
          licensesSold: 0,
          logoUrl,
          coverImageUrl,
          imageUrls,
          description,
          discount,
          promoEndDate: promoDuration > 0 ? new Date(Date.now() + promoDuration * 24 * 60 * 60 * 1000).toISOString() : null,
          sellerId: user.id
        });

        setGames(prevGames => [...prevGames, {
          id: response.data.id,
          name,
          category,
          size,
          price,
          licensesAvailable: quantity,
          licensesSold: 0,
          logoUrl,
          coverImageUrl,
          imageUrls,
          description,
          discount,
          promoEndDate: promoDuration > 0 ? new Date(Date.now() + promoDuration * 24 * 60 * 60 * 1000).toISOString() : null,
          sellerId: user.id
        }]);
        setAlertMessage('Juego nuevo añadido y licencias vendidas!');
        setAlertType('success');
      } catch (error) {
        setAlertMessage('Error al añadir el nuevo juego.');
        setAlertType('error');
        console.error('Error al añadir el nuevo juego:', error);
      }
    }
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setCategory('Rompecabezas');
    setSize(1);
    setPrice(0);
    setQuantity(1);
    setLogoUrl('');
    setCoverImageUrl('');
    setImageUrls(['', '', '', '']);
    setDescription('');
    setDiscount(0);
    setPromoDuration(0);
    setErrors({});
  };

  const handleNumberChange = (value, setter, field) => {
    if (value < 0) {
      setErrors(prev => ({ ...prev, [field]: 'El valor no puede ser negativo.' }));
      setter(0);
    } else {
      setErrors(prev => ({ ...prev, [field]: null }));
      setter(value);
    }
  };

  const maxTextLength = 255; // máximo de caracteres para los textos

  if (!user || !user.id) {
    return <p>Debes iniciar sesión para ver esta página.</p>;
  }

return (
  <div className="sales-page">
    <h1>Vender Juego</h1>
    <form className="sales-form">
    <div className="form-row">
      <div className="form-group">
        <label>Nombre:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value.slice(0, maxTextLength))} 
          placeholder="Ej. Aventura Épica"
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label>Categoría:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="Rompecabezas">Rompecabezas</option>
          <option value="Acción">Acción</option>
          <option value="Deportes">Deportes</option>
        </select>
        {errors.category && <p className="error">{errors.category}</p>}
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Tamaño (KB):</label>
        <input 
          type="number" 
          value={size} 
          onChange={(e) => handleNumberChange(parseInt(e.target.value), setSize, 'size')} 
          placeholder="Ej. 50000"
          required
        />
        {errors.size && <p className="error">{errors.size}</p>}
      </div>
      <div className="form-group">
        <label>Cantidad de Licencias:</label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => handleNumberChange(parseInt(e.target.value), setQuantity, 'quantity')} 
          placeholder="Ej. 100"
          required
        />
        {errors.quantity && <p className="error">{errors.quantity}</p>}
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Precio:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => handleNumberChange(parseFloat(e.target.value), setPrice, 'price')} 
          placeholder="Ej. 19.99"
          required
        />
        {errors.price && <p className="error">{errors.price}</p>}
      </div>
      <div className="form-group">
        <label>Descuento (%):</label>
        <input 
          type="number" 
          value={discount} 
          onChange={(e) => handleNumberChange(parseFloat(e.target.value), setDiscount, 'discount')} 
          placeholder="Ej. 10"
          required
        />
        {errors.discount && <p className="error">{errors.discount}</p>}
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Duración de la promoción (días):</label>
        <input 
          type="number" 
          value={promoDuration} 
          onChange={(e) => handleNumberChange(parseInt(e.target.value), setPromoDuration, 'promoDuration')} 
          placeholder="Ej. 30"
          required
        />
        {errors.promoDuration && <p className="error">{errors.promoDuration}</p>}
      </div>
      <div className="form-group">
      <label>URL del Logo:</label>
      <input 
        type="text" 
        value={logoUrl} 
        onChange={(e) => setLogoUrl(e.target.value.slice(0, maxTextLength))} 
        placeholder="Ej. https://misitio.com/logo.png"
        required
      />
      {errors.logoUrl && <p className="error">{errors.logoUrl}</p>}
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">
      <label>URL de la Portada:</label>
      <input 
        type="text" 
        value={coverImageUrl} 
        onChange={(e) => setCoverImageUrl(e.target.value.slice(0, maxTextLength))} 
        placeholder="Ej. https://misitio.com/portada.png"
        required
      />
      {errors.coverImageUrl && <p className="error">{errors.coverImageUrl}</p>}
    </div>
  </div>

  <div className="form-group">
    <label>URLs de Imágenes del Juego:</label>
    {imageUrls.map((url, index) => (
      <input 
        key={index}
        type="text" 
        value={url} 
        onChange={(e) => {
          const newUrls = [...imageUrls];
          newUrls[index] = e.target.value.slice(0, maxTextLength);
          setImageUrls(newUrls);
        }} 
        placeholder={`Imagen ${index + 1}`}
        required
      />
    ))}
    {errors.imageUrls && <p className="error">{errors.imageUrls}</p>}
  </div>


    <div className="form-group">
      <label>Descripción:</label>
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value.slice(0, maxTextLength))} 
        placeholder="Describe tu juego aquí..."
        required
      />
      {errors.description && <p className="error">{errors.description}</p>}
    </div>

    <button type="button" onClick={handleSell}>Vender Juego</button>
  </form>

    <UserGames games={games} userId={user.id} />
  </div>

  );
};

export default Sales;
