import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchCart = async () => {
        const cartCollection = collection(db, `users/${currentUser.uid}/cart`);
        const cartSnapshot = await getDocs(cartCollection);
        setCart(cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      };
      fetchCart();
    }
  }, [currentUser]);

  const addToCart = async (product, quantity) => {
    if (currentUser) {
      const cartRef = collection(db, `users/${currentUser.uid}/cart`);
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        const productRef = doc(db, `users/${currentUser.uid}/cart`, existingProduct.id);
        await updateDoc(productRef, {
          quantity: existingProduct.quantity + quantity
        });
      } else {
        await addDoc(cartRef, { ...product, quantity });
      }
      setCart(prevCart => [...prevCart, { ...product, quantity }]);
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = localCart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        localCart.push({ ...product, quantity });
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

export const useCart = () => useContext(CartContext);
