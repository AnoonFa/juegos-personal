import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useAuth();
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
          const response = await axios.post('http://localhost:3000/cart', {
            productId: product.id,
            quantity,
            userId: user.id,
          });
          setCart(prevCart => [...prevCart, response.data]); // Actualiza el carrito con el nuevo producto
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      // Para manejar el carrito en localStorage si el usuario no está autenticado
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = localCart.find(item => item.productId === product.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        localCart.push({ productId: product.id, quantity });
      }
      localStorage.setItem('cart', JSON.stringify(localCart));
      setCart(localCart);
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
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
