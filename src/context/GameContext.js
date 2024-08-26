import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

export const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
  const [allGames, setAllGames] = useState([]);
  const [games, setGames] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);  // Agrega un estado para manejar errores
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'games'),
      (snapshot) => {
        const gamesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllGames(gamesData);
        setGames(gamesData);
        setError(null);  // Restablece el error si la carga es exitosa
      },
      (error) => {
        console.error("Error loading games: ", error);
        setError("No tienes permiso para ver los juegos.");  // Maneja errores de permisos
      }
    );

    return () => unsubscribe();
  }, [db]);

  const addToCart = (gameId, quantity) => {
    const game = games.find(g => g.id === gameId);
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
      console.error("Game not found");
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
                licensesSold: game.licensesSold + quantity
              }
            : {
                ...game,
                licensesAvailable: game.licensesAvailable + quantity,
                licensesSold: game.licensesSold - quantity
              }
          : game
      )
    );
  };

  return (
    <GamesContext.Provider value={{ allGames, games, cart, addToCart, removeFromCart, updateGameLicenses, setGames, error }}>
      {children}
      {error && <div className="error-message">{error}</div>}  // Muestra el mensaje de error si existe
    </GamesContext.Provider>
  );
};
