import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  // Si el usuario no está autenticado, redirigir a /home
  return user.role !== 'nolog' ? element : <Navigate to="/home" />;
};

export default ProtectedRoute;
