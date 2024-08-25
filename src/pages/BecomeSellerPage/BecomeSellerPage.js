import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const BecomeSellerPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBecomeSeller = () => {
    if (!user) {
      navigate('/login'); // Redirige al login si no está autenticado
    } else {
      navigate('/Checkout', { state: { purchaseType: 'membership' } }); // Redirige a la página de pagos si está autenticado
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Conviértete en Vendedor</h1>
      <img 
        src="/path_to_your_image/logo.png" 
        alt="Colaborador" 
        style={{ borderRadius: '50%', width: '150px', marginBottom: '20px' }}
      />
      <h2>Como agradecimiento por tu colaboración</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ margin: '0 20px' }}>
          <img src="/path_to_your_image/badge.png" alt="Insignia" style={{ width: '60px' }} />
          <p>Insignia de Colaborador</p>
        </div>
        <div style={{ margin: '0 20px' }}>
          <img src="/path_to_your_image/group.png" alt="Grupo de Colaboradores" style={{ width: '60px' }} />
          <p>Grupo de Colaboradores</p>
        </div>
      </div>
      <h3>Beneficios para Colaboradores</h3>
      <ul style={{ textAlign: 'left', display: 'inline-block', marginBottom: '20px' }}>
        <li>Vender tus propios juegos en la plataforma</li>
        <li>Comisión del 10% en ventas</li>
        <li>Acceso exclusivo a estadísticas y reportes de ventas</li>
      </ul>
      <p>$19.00 por mes | Cancela cuando quieras</p>
      <button 
        onClick={handleBecomeSeller} 
        style={{
          backgroundColor: '#007BFF', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        QUIERO COLABORAR
      </button>
    </div>
  );
};

export default BecomeSellerPage;
