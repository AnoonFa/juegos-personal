import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { usePageTitle } from '../../context/PageTitleContext'; // Importar el contexto del título

const PaymentPage = () => {
  const { user } = useAuth();
  const { setTitle } = usePageTitle(); // Obtener la función para establecer el título

  useEffect(() => {
    setTitle('Pago'); // Establecer el título de la página
  }, [setTitle]);

  const handlePaymentSuccess = async () => {
    if (user) {
      try {
        await axios.put(`http://localhost:3000/users/${user.id}`, { membership: true });
        alert('Pago completado con éxito');
        // Redirigir o mostrar mensaje de éxito
      } catch (error) {
        console.error('Error al actualizar membresía:', error);
      }
    }
  };

  return (
    <div>
      <h1>Pago</h1>
      <button onClick={handlePaymentSuccess}>Completar Pago</button>
    </div>
  );
};

export default PaymentPage;
