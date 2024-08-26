import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const medalla = require('../../assets/icons/medalla.png');

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
    <div style={styles.container}>
      <h1 style={styles.title}>Conviértete en Vendedor</h1>
      <img 
        src={medalla} 
        alt="Colaborador" 
        style={styles.image}
      />
      <h2 style={styles.subtitle}>Vende juegos, Comparalos y mas!!</h2>
      <h3 style={styles.benefitsTitle}>Beneficios para Colaboradores</h3>
      <ul style={styles.benefitsList}>
        <li>Vender tus propios juegos en la plataforma</li>
        <li>Compara las estadisticas de tus juegos</li>
        <li>Acceso exclusivo a estadísticas y reportes de ventas</li>
      </ul>
      <p style={styles.price}>COP $30000 Pago único</p>
      <button 
        onClick={handleBecomeSeller} 
        style={styles.button}
      >
        QUIERO COLABORAR
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#121212', // Fondo oscuro
    color: '#e0e0e0', // Texto claro
    minHeight: '100vh', // Asegura que cubra toda la pantalla
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#BB86FC', // Color de acento
  },
  image: {
    borderRadius: '50%',
    width: '150px',
    marginBottom: '20px',
    border: '2px solid #BB86FC', // Añade un borde de color acento
  },
  subtitle: {
    fontSize: '1.5em',
    marginBottom: '20px',
  },
  benefitsTitle: {
    fontSize: '1.3em',
    marginBottom: '10px',
    color: '#03DAC6', // Otro color de acento
  },
  benefitsList: {
    textAlign: 'left',
    display: 'inline-block',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  price: {
    fontSize: '1.2em',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#03DAC6', // Color del botón
    color: '#121212', // Texto oscuro para contrastar con el botón
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.3s',
  }
};

export default BecomeSellerPage;
