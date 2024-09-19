import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Stepper, Step, StepLabel, Button, Typography, CssBaseline, Alert, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import emailjs from 'emailjs-com';


const sendMembershipEmail = (to_name, to_email) => {
  if (!to_name || !to_email) {
    console.error('Datos insuficientes para enviar el correo de membresía.');
    return;
  }

  const templateParams = {
    to_name,
    to_email,
  };

  emailjs.send('service_ln46x09', 'template_pz0uryq', templateParams, 'yfJ6DXwpEyUeIsGHX')
    .then((result) => {
      console.log('Correo de membresía enviado con éxito:', result.text);
    })
    .catch((error) => {
      console.error('Error al enviar el correo de membresía:', error.text);
    });
};

const sendGamesEmail = (to_name, to_email, games, totalPrice) => {
  if (!to_name || !to_email || games.length === 0) {
    console.error('Datos insuficientes para enviar el correo de juegos.');
    return;
  }

  const templateParams = {
    to_name,
    to_email,
    games: games.map(game => ({
      name: game.name,
      quantity: game.quantity,
      price: game.price,
    })),
    totalPrice: totalPrice.toFixed(2),
  };

  emailjs.send('service_ln46x09', 'template_pf2v4ge', templateParams, 'yfJ6DXwpEyUeIsGHX')
    .then((result) => {
      console.log('Correo de juegos enviado con éxito:', result.text);
    })
    .catch((error) => {
      console.error('Error al enviar el correo de juegos:', error.text);
    });
};

const steps = ['Detalles de la compra', 'Método de pago', 'Revisar orden'];

function getStepContent(step, formData, handleInputChange, purchaseType, cartItems) {
  switch (step) {
    case 0:
      return <AddressForm formData={formData} handleInputChange={handleInputChange} purchaseType={purchaseType} cartItems={cartItems} />;
    case 1:
      return <PaymentForm formData={formData} handleInputChange={handleInputChange} cartItems={cartItems} />;
    case 2:
      return <Review purchaseType={purchaseType} cartItems={cartItems} />;
    default:
      throw new Error('Paso desconocido');
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    to_name: '',
    to_email: '',
    cardType: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCart();

  const { purchaseType, cartItems = [] } = location.state || {
    purchaseType: null,
    cartItems: []
  };
  
  // Verifica los datos de cartItems
  console.log(cartItems); // Esto debería mostrar los detalles de los juegos en el carrito
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const isFormValid = () => {
    switch (activeStep) {
      case 0:
        return formData.to_name.trim() !== '' && formData.to_email.trim() !== '';
      case 1:
        return ['cardType', 'cardNumber', 'expDate', 'cvv'].every(field => formData[field].trim() !== '');
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await handlePayment();
    } else if (isFormValid()) {
      setActiveStep(activeStep + 1);
    } else {
      setAlertMessage('Por favor, complete todos los campos antes de continuar.');
      setAlertType('error');
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePayment = async () => {
    try {
      let totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
      if (purchaseType === 'membership') {
        // Lógica para membresía
        const updatedUser = {
          ...user,
          membership: true,
        };
        totalPrice = 19;
        await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);
        sendMembershipEmail(formData.to_name, formData.to_email);
        setAlertMessage('Membresía adquirida con éxito.');
        setAlertType('success');
        navigate('/SalesPage');
  
      } else if (purchaseType === 'game' && cartItems.length > 0) {
        // Lógica para compra de juegos
        for (const item of cartItems) {
          // Asegúrate de usar productId en lugar de id del carrito
          const gameResponse = await axios.get(`http://localhost:3000/games/${item.productId}`);
          if (!gameResponse.data) {
            setAlertMessage(`Juego con id ${item.productId} no encontrado.`);
            setAlertType('error');
            return;
          }
  
          const gameData = gameResponse.data;
  
          const purchaseData = {
            buyerId: user.id,
            sellerId: gameData.sellerId,
            gameId: item.productId, // Usar productId aquí
            quantity: item.quantity,
            purchaseDate: new Date().toISOString().split('T')[0],
            price: item.price,
            totalPrice: item.price * item.quantity,
            gameName: item.name,
          };
  
          await axios.post('http://localhost:3000/purchases', purchaseData);
  
          const existingGame = user.gamesOwned.find(g => g.gameId === item.productId);
          const updatedGamesOwned = existingGame
            ? user.gamesOwned.map(g =>
                g.gameId === item.productId
                  ? { ...g, quantity: g.quantity + item.quantity }
                  : g
              )
            : [...user.gamesOwned, { gameId: item.productId, quantity: item.quantity }];
  
          const updatedUser = {
            ...user,
            gamesOwned: updatedGamesOwned,
          };
  
          await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);
          const updatedGameData = {
            ...gameData,
            licensesSold: gameData.licensesSold + item.quantity,
            licensesAvailable: gameData.licensesAvailable - item.quantity,
          };
          await axios.put(`http://localhost:3000/games/${item.productId}`, updatedGameData);
        }
  
        sendGamesEmail(formData.to_name, formData.to_email, cartItems, totalPrice);
        setAlertMessage('Compra realizada con éxito.');
        setAlertType('success');
      }
  
      clearCart(); // Limpiar el carrito después del pago
      navigate('/Home'); // Navegar a la página de agradecimiento
    } catch (error) {
      setAlertMessage(`Error al procesar el pago: ${error.message}`);
      setAlertType('error');
    }
  };
  

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      background: {
        default: '#121212',
        paper: '#1d1d1d',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b0b0b0',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Paper
          sx={{
            width: '75%',
            margin: 'auto',
            marginBottom: '10.6rem',
            marginTop: '15rem',
            padding: '5rem',
            backgroundColor: 'background.paper',
            color: 'text.primary',
          }}
        >
          <Typography component="h1" variant="h4" align="center">
            Proceso de Pago
          </Typography>
          <Stepper activeStep={activeStep} sx={{ padding: '1rem 0 2rem' }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {alertMessage && (
            <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
              <Alert severity={alertType} onClose={() => setAlertMessage('')}>
                {alertMessage}
              </Alert>
            </Stack>
          )}

          {getStepContent(activeStep, formData, handleInputChange, purchaseType, cartItems)}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ marginRight: '1rem' }}>
                Atrás
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Completar Pago' : 'Siguiente'}
            </Button>
          </div>
        </Paper>
      </main>
    </ThemeProvider>
  );
}
