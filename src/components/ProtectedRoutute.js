import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element, protectedRoute }) => {
  const { user } = useAuth();

  // Si la ruta es protegida y el usuario no está autenticado, redirigir al inicio de sesión
  if (protectedRoute && (!user || !user.role || user.role === 'nolog')) {
    return <Navigate to="/login" />;
  }

  // Si la ruta no es protegida, permitir el acceso
  return element;
};

export default ProtectedRoute;
