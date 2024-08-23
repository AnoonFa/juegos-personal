import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebaseConfig';  // Firebase Auth import
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const RoleProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { role: 'nolog' };
  });

  useEffect(() => {
    // Firebase authentication listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Aquí podrías obtener más detalles del usuario de Firebase, como su rol
        setUser({ uid: currentUser.uid, email: currentUser.email, role: 'cliente' }); // Supongamos que es cliente
      } else {
        setUser({ role: 'nolog' });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Guardar el rol del usuario en el almacenamiento local
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
