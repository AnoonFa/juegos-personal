// Importamos las bibliotecas necesarias de React y el contexto de autenticación
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';  // Usamos el contexto de autenticación

// Creamos el contexto de roles
const RoleContext = createContext();

// Este componente provee el contexto de roles a toda la aplicación
export const RoleProvider = ({ children }) => {
  // Usamos el estado 'role' para almacenar el rol del usuario
  const [role, setRole] = useState('nolog');  // 'nolog' indica que no hay sesión iniciada
  const { user } = useAuth();  // Obtenemos el usuario autenticado

  // Usamos useEffect para actualizar el rol cada vez que el usuario cambia
  useEffect(() => {
    if (user) {
      // Aquí puedes agregar la lógica para asignar roles basados en la información del usuario
      setRole(user.email === 'admin@example.com' ? 'admin' : 'client');  // Ejemplo básico
    } else {
      setRole('nolog');
    }
  }, [user]);

  // Proveemos el estado 'role' y su función de actualización a través del contexto
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// Hook personalizado para usar el contexto de roles
export const useRole = () => useContext(RoleContext);
