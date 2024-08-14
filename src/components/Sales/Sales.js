import React, { useState, useContext } from 'react';
import { GamesContext } from '../../context/GameContext';
import './Sales.css';

const Sales = () => {
  const { games, updateGameLicenses } = useContext(GamesContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('rompecabezas');
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState('');

  const handleSell = () => {
    const existingGame = games.find(game => game.name.toLowerCase() === name.toLowerCase());
    if (existingGame) {
      updateGameLicenses(existingGame.id, quantity, false);
      alert('Licencias añadidas al juego existente!');
    } else {
      const newGame = {
        id: games.length + 1,
        name,
        category,
        size,
        price,
        licensesAvailable: quantity,
        licensesSold: 0,
        image
      };
      games.push(newGame);  // Simulación de añadir el juego al estado global
      alert('Juego nuevo añadido y licencias vendidas!');
    }
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setCategory('rompecabezas');
    setSize(0);
    setPrice(0);
    setQuantity(1);
    setImage('');
  };

  return (
    <div className="sales-page">
      <h1>Vender Juego</h1>
      <div className="sales-form">
        <label>
          Nombre:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Categoría:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="rompecabezas">Rompecabezas</option>
            <option value="acción">Acción</option>
            <option value="deporte">Deporte</option>
          </select>
        </label>
        <label>
          Tamaño (KB):
          <input type="number" value={size} onChange={(e) => setSize(parseInt(e.target.value))} />
        </label>
        <label>
          Precio:
          <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
        </label>
        <label>
          Cantidad de Licencias:
          <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
        </label>
        <label>
          URL de Imagen:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <button onClick={handleSell}>Vender</button>
      </div>
      <div className="existing-games">
        <h2>Juegos Existentes</h2>
        {games.map(game => (
          <div key={game.id} className="game-card">
            <img src={game.image} alt={game.name} />
            <h3>{game.name}</h3>
            <p>Categoría: {game.category}</p>
            <p>Licencias Disponibles: {game.licensesAvailable}</p>
            <p>Licencias Vendidas: {game.licensesSold}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
