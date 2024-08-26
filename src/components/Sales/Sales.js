import React, { useState, useContext } from 'react';
import { GamesContext } from '../../context/GameContext';
import { db } from '../../firebaseConfig';
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useAuth } from '../../context/AuthContext';
import './Sales.css';

const Sales = () => {
  const { games, setGames, updateGameLicenses } = useContext(GamesContext);
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Rompecabezas');
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoDuration, setPromoDuration] = useState(0);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'El nombre es obligatorio.';
    if (!category) newErrors.category = 'La categoría es obligatoria.';
    if (size <= 0) newErrors.size = 'El tamaño debe ser mayor a 0.';
    if (price <= 0) newErrors.price = 'El precio debe ser mayor a 0.';
    if (quantity <= 0) newErrors.quantity = 'La cantidad debe ser mayor a 0.';
    if (!image) newErrors.image = 'La URL de la imagen es obligatoria.';
    if (!description) newErrors.description = 'La descripción es obligatoria.';
    if (discount < 0 || discount > 100) newErrors.discount = 'El descuento debe estar entre 0 y 100.';
    if (promoDuration < 0) newErrors.promoDuration = 'La duración de la promoción no puede ser negativa.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSell = async () => {
    if (!validateForm()) return;

    if (!user || !user.uid) {
      alert('Debes estar autenticado para vender juegos.');
      return;
    }

    const existingGame = games.find(game => game.name.toLowerCase() === name.toLowerCase() && game.sellerId === user.uid);
    if (existingGame) {
      const gameRef = doc(db, "games", existingGame.id);
      await updateDoc(gameRef, {
        licensesAvailable: existingGame.licensesAvailable + quantity
      });

      updateGameLicenses(existingGame.id, quantity, false);
      alert('Licencias añadidas al juego existente!');
    } else {
      const newGameRef = await addDoc(collection(db, "games"), {
        name,
        category,
        size,
        price,
        licensesAvailable: quantity,
        licensesSold: 0,
        imageUrl: image,
        description,
        discount,
        promoEndDate: promoDuration > 0 ? new Date(Date.now() + promoDuration * 24 * 60 * 60 * 1000).toISOString() : null,
        sellerId: user.uid
      });

      setGames(prevGames => [...prevGames, {
        id: newGameRef.id,
        name,
        category,
        size,
        price,
        licensesAvailable: quantity,
        licensesSold: 0,
        imageUrl: image,
        description,
        discount,
        promoEndDate: promoDuration > 0 ? new Date(Date.now() + promoDuration * 24 * 60 * 60 * 1000).toISOString() : null,
        sellerId: user.uid
      }]);
      alert('Juego nuevo añadido y licencias vendidas!');
    }
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setCategory('Rompecabezas');
    setSize(0);
    setPrice(0);
    setQuantity(1);
    setImage('');
    setDescription('');
    setDiscount(0);
    setPromoDuration(0);
    setErrors({});
  };

  // Verificar si user existe antes de acceder a su propiedad uid
  if (!user || !user.uid) {
    return <p>Debes iniciar sesión para ver esta página.</p>;
  }

  const userGames = games.filter(game => game.sellerId === user.uid && game.licensesAvailable > 0);

  return (
    <div className="sales-page">
      <h1>Vender Juego</h1>
      <div className="sales-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Rompecabezas">Rompecabezas</option>
            <option value="Acción">Acción</option>
            <option value="Deportes">Deporte</option>
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>
        <div className="form-group">
          <label>Tamaño (KB):</label>
          <input 
            type="number" 
            value={size} 
            onChange={(e) => setSize(parseInt(e.target.value))} 
          />
          {errors.size && <p className="error">{errors.size}</p>}
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(parseFloat(e.target.value))} 
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>
        <div className="form-group">
          <label>Cantidad de Licencias:</label>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(parseInt(e.target.value))} 
          />
          {errors.quantity && <p className="error">{errors.quantity}</p>}
        </div>
        <div className="form-group">
          <label>Imagen URL:</label>
          <input 
            type="text" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div className="form-group">
          <label>Descuento (%):</label>
          <input 
            type="number" 
            value={discount} 
            onChange={(e) => setDiscount(parseFloat(e.target.value))} 
          />
          {errors.discount && <p className="error">{errors.discount}</p>}
        </div>
        <div className="form-group">
          <label>Duración de la promoción (días):</label>
          <input 
            type="number" 
            value={promoDuration} 
            onChange={(e) => setPromoDuration(parseInt(e.target.value))} 
          />
          {errors.promoDuration && <p className="error">{errors.promoDuration}</p>}
        </div>
        <button onClick={handleSell}>Vender Juego</button>
      </div>

      <div className="existing-games">
        <h2>Tus Juegos</h2>
        {userGames.length > 0 ? (
          userGames.map(game => (
            <div key={game.id} className="game-card">
              <img src={game.imageUrl} alt={game.name} />
              <h3>{game.name}</h3>
              <button className='agregarlicencias'>Agregar más licencias</button>
            </div>
          ))
        ) : (
          <p>No tienes juegos disponibles para vender.</p>
        )}
      </div>
    </div>
  );
};

export default Sales;
