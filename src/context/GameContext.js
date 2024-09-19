import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
  const [allGames, setAllGames] = useState([]);
  const [games, setGames] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3000/games');
        setAllGames(response.data); // Solo cargar una vez
        setGames(response.data); // Inicializar con todos los juegos
        setError(null);
      } catch (error) {
        console.error('Error loading games:', error);
        setError('No tienes permiso para ver los juegos.');
      }
    };

    fetchGames();
  }, []);

  const addToCart = (gameId, quantity) => {
    const game = games.find(g => String(g.id) === String(gameId)); // Asegurarse de comparar como cadena
    if (game) {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === gameId);
        if (existingItem) {
          return prevCart.map(item =>
            item.id === gameId ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          return [...prevCart, { ...game, quantity }];
        }
      });
    } else {
      console.error('Game not found');
    }
  };
  

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateGameLicenses = (gameId, quantity, isBuying) => {
    setGames(prevGames =>
      prevGames.map(game =>
        game.id === gameId
          ? isBuying
            ? {
                ...game,
                licensesAvailable: game.licensesAvailable - quantity,
                licensesSold: game.licensesSold + quantity,
              }
            : {
                ...game,
                licensesAvailable: game.licensesAvailable + quantity,
                licensesSold: game.licensesSold - quantity,
              }
          : game
      )
    );

     // Actualizar la cantidad en el carrito
     setCart(prevCart =>
      prevCart.map(item =>
        item.id === gameId
          ? { ...item, quantity: quantity }
          : item
      ).filter(item => item.quantity > 0) // Eliminar si la cantidad es 0
    );
  };

  return (
    <GamesContext.Provider value={{ allGames, games, cart, addToCart, removeFromCart, updateGameLicenses, setGames, error }}>
      {children}
      {error && <div className="error-message">{error}</div>}
    </GamesContext.Provider>
  );
};
