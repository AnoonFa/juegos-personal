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
          await axios.put(`http://localhost:3000/cart/${existingProduct.id}`, {
            ...existingProduct,
            quantity: existingProduct.quantity + quantity,
          });
        } else {
          const response = await axios.post('http://localhost:3000/cart', {
            productId: product.id,
            quantity,
            userId: user.id,
          });
          setCart(prevCart => [...prevCart, response.data]);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
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

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
