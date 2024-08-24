// Importamos las bibliotecas necesarias de React y Firebase
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';  // Asegúrate de que esta configuración esté correcta
import { onAuthStateChanged } from 'firebase/auth';  // Escucha cambios en el estado de autenticación

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Este componente provee el contexto de autenticación a toda la aplicación
export const AuthProvider = ({ children }) => {
  // Definimos el estado 'user' para almacenar el usuario autenticado
  const [user, setUser] = useState(null);

  // Usamos useEffect para escuchar cambios en el estado de autenticación
  useEffect(() => {
    // Suscripción a cambios de estado en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Si hay un usuario autenticado, actualizamos el estado
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Si no hay un usuario autenticado, establecemos el estado en null
        setUser(null);
      }
    });

    // Nos desuscribimos cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  // Proveemos el estado 'user' y su función de actualización a través del contexto
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
