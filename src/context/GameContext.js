import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

export const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
  const [allGames, setAllGames] = useState([]); // Nuevo estado para mantener todos los juegos
  const [games, setGames] = useState([]);
  const [cart, setCart] = useState([]);
  const db = getFirestore();

  // Cargar juegos desde Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'games'), (snapshot) => {
      const gamesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAllGames(gamesData); // Guardar todos los juegos
      setGames(gamesData); // Inicialmente, mostrar todos los juegos
    });

    return () => unsubscribe(); // Limpiar la suscripción al desmontar
  }, [db]);

  // Agregar al carrito
  const addToCart = (gameId, quantity) => {
    const game = games.find(g => g.id === gameId);
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
  };

  // Actualizar licencias de un juego
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
    <GamesContext.Provider value={{ allGames, games, cart, addToCart, updateGameLicenses, setGames  }}>
      {children}
    </GamesContext.Provider>
  );
};
