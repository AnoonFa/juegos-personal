import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const RoleProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Recuperar el rol del usuario del almacenamiento local si existe
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { role: 'nolog' };
  });

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
