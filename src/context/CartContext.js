import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Importar el contexto de autenticación

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user, updateUser } = useAuth(); // Obtener el usuario y la función de actualización del AuthContext
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/cart?userId=${user.id}`);
          setCart(response.data);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };
      fetchCart();
    }
  }, [user]);

  const addToCart = async (product, quantity) => {
    if (user) {
      try {
        const existingProduct = cart.find(item => item.productId === product.id);
        if (existingProduct) {
          const updatedProduct = {
            ...existingProduct,
            quantity: existingProduct.quantity + quantity
          };
          await axios.put(`http://localhost:3000/cart/${existingProduct.id}`, updatedProduct);
          setCart(prevCart => prevCart.map(item => 
            item.productId === product.id ? updatedProduct : item
          ));
        } else {
          const newProduct = {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            userId: user.id,
            imageUrls: product.imageUrls,
            discount: product.discount,
            promoEndDate: product.promoEndDate
          };
          const response = await axios.post('http://localhost:3000/cart', newProduct);
          setCart(prevCart => [...prevCart, response.data]);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  const purchaseGame = async (game) => {
    if (user) {
      try {
        // Agregar el juego a gamesOwned del usuario
        const existingGame = user.gamesOwned.find(owned => owned.gameId === game.id);
        if (existingGame) {
          // Si el juego ya está en la biblioteca, aumentar la cantidad
          existingGame.quantity += 1;
        } else {
          // Si el juego no está en la biblioteca, añadirlo
          user.gamesOwned.push({ gameId: game.id, quantity: 1 });
        }
        // Actualizar el usuario con los nuevos juegos
        updateUser({ ...user });

        // Limpiar el carrito después de la compra
        await clearCart();
      } catch (error) {
        console.error('Error purchasing game:', error);
      }
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      try {
        const existingProduct = cart.find(item => item.productId === productId);
        if (existingProduct) {
          await axios.delete(`http://localhost:3000/cart/${existingProduct.id}`);
          setCart(cart.filter(item => item.productId !== productId));
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = localCart.filter(item => item.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const userCart = cart.filter(item => item.userId === user.id);
        for (let item of userCart) {
          await axios.delete(`http://localhost:3000/cart/${item.id}`);
        }
        setCart([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, purchaseGame }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
