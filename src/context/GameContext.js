import React, { createContext, useState } from 'react';

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
    image: "rompe.png"
  },
  {
    id: 2,
    name: "Action Hero",
    category: "acción",
    size: 15000,
    price: 200,
    licensesAvailable: 15,
    licensesSold: 10,
    image: "apex.png"
  },
  {
    id: 3,
    name: "Sports Mania",
    category: "deporte",
    size: 8000,
    price: 120,
    licensesAvailable: 20,
    licensesSold: 8,
    image: "fifa.png"
  },
  {
    id: 4,
    name: "Call of Gruty",
    category: "acción",
    size: 4000,
    price: 90,
    licensesAvailable: 50,
    licensesSold: 12,
    image: "calof.png"
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