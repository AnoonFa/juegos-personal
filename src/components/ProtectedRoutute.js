import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element, protectedRoute }) => {
  const { user } = useAuth();

  // Si la ruta es protegida y el usuario no está autenticado, redirigir al inicio de sesión
  if (protectedRoute && (!user || !user.role || user.role === 'nolog')) {
    return <Navigate to="/login" />;
  }
  // If the user is an admin and is trying to access the admin route
  if (element.props.path === '/admin' && user.role !== 'administrador') {
    return <Navigate to="/" />;  // Redirect to home if not authorized
  }
  // Si la ruta no es protegida, permitir el acceso
  return element;
};

export default ProtectedRoute;
