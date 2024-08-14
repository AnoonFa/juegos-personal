import React, { createContext, useState } from 'react';

import juego1 from '../assets/images/calof.png';
import juego2 from '../assets/images/rompe.png';
import juego3 from '../assets/images/apex.png';
import juego4 from '../assets/images/fifa.png';
export const GamesContext = createContext();

const initialGames = [
  {
    id: 1,
    name: "Puzzle Master",
    category: "rompecabezas",
    size: 5000,
    price: 100,
    licensesAvailable: 30,
    licensesSold: 5,
    image: {juego2}
  },
  {
    id: 2,
      name: "Action Hero",
    category: "acción",
    size: 15000,
    price: 200,
    licensesAvailable: 15,
    licensesSold: 10,
    image: {juego3}
  },
  {
    id: 3,
    name: "Sports Mania",
    category: "deporte",
    size: 8000,
    price: 120,
    licensesAvailable: 20,
    licensesSold: 8,
    image: {juego4}
  },
  {
    id: 4,
    name: "Call of Gruty",
    category: "acción",
    size: 4000,
    price: 90,
    licensesAvailable: 50,
    licensesSold: 12,
    image: {juego1}
  }
];

export const GamesProvider = ({ children }) => {
    const [games, setGames] = useState(initialGames);
    const [cart, setCart] = useState([]);
  
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
      <GamesContext.Provider value={{ games, cart, addToCart, updateGameLicenses }}>
        {children}
      </GamesContext.Provider>
    );
  };