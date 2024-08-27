// RoleContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('nolog');
  const { user } = useAuth();

  useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:3000/roles?userId=${user.id}`);
          setRole(response.data.role || 'cliente');
        } catch (error) {
          console.error('Error fetching role:', error);
          setRole('cliente');
        }
      } else {
        setRole('nolog');
      }
    };

    fetchRole();
  }, [user]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
