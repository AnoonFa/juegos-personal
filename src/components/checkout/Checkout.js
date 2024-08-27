import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Stepper, Step, StepLabel, Button, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext'; // Importar el contexto del carrito
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
      return <PaymentForm formData={formData} handleInputChange={handleInputChange} />;
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


  
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clearCart } = useCart(); // Obtener el carrito y la función para vaciarlo

  const { purchaseType, cartItems = [] } = location.state || {
    purchaseType: null,
    cartItems: []
  };

  const calculateDiscount = () => {
    let total = 0;
    let totalPuzzles = 0;
    let totalSports = 0;
    let totalAction = 0;

    cartItems.forEach(item => {
      total += item.price * item.quantity;
      if (item.category === "rompecabezas") totalPuzzles += item.quantity;
      if (item.category === "deporte") totalSports += item.quantity;
      if (item.category === "acción") totalAction += item.quantity;
    });

    let discount = 0;
    if (totalPuzzles >= 25) {
      discount = 0.20;
    } else if (totalSports >= 20 && totalAction >= 15) {
      discount = 0.15;
    }

    const discountedTotal = total - (total * discount);
    return { total, discountedTotal, discount };
  };

  const { total, discountedTotal, discount } = calculateDiscount();

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
      alert('Pago completado con éxito');
      navigate('/');
    } else if (isFormValid()) {
      setActiveStep(activeStep + 1);
    } else {
      alert('Por favor, complete todos los campos antes de continuar.');
    }
  };



  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePayment = async () => {
    try {
      let totalPrice = discountedTotal;

      if (purchaseType === 'membership') {
        const updatedUser = {
          ...user,
          role: 'vendedor',
          sellerId: user.id, // Podrías generar un ID único si es necesario
        };
        totalPrice = 19;
        await axios.put(`http://localhost:3000/users/${user.id}`, { membership: true }, updatedUser);
        sendMembershipEmail(formData.to_name, formData.to_email);
        navigate('/SalesPage');

      } else if (purchaseType === 'game' && cartItems.length > 0) {
        for (const item of cartItems) {
          if (!item.sellerId || !user?.id || !item.id) {
            throw new Error(`Datos insuficientes para registrar la compra. Verifica el vendedor, el usuario y el ID del juego.`);
          }
          const gameResponse = await axios.get(`http://localhost:3000/games/${item.id}`);
          const gameData = gameResponse.data;

          // Registro de la compra
          const purchaseData = {
              buyerId: user.id,
              sellerId: gameData.sellerId, // Obtener sellerId del juego
              gameId: item.id,
              quantity: item.quantity,
              purchaseDate: new Date().toISOString().split('T')[0],
              price: item.price,
              totalPrice: item.price * item.quantity,
              gameName: item.name,
          };


          await axios.post('http://localhost:3000/purchases', purchaseData);

          // Actualización del juego en gamesOwned del usuario
          const existingGame = user.gamesOwned.find(g => g.gameId === item.id);
          const updatedGamesOwned = existingGame
          ? user.gamesOwned.map(g =>
              g.gameId === item.id
                ? { ...g, quantity: g.quantity + item.quantity }
                : g
            )
          : [...user.gamesOwned, { gameId: item.id, quantity: item.quantity }];
        const updatedUser = {
          ...user,
          gamesOwned: updatedGamesOwned,
        };

        await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);

        const updatedGameData = {
          ...gameData, // Mantener todos los campos existentes del juego
          licensesSold: gameData.licensesSold + item.quantity,
          licensesAvailable: gameData.licensesAvailable - item.quantity,
        };
        await axios.put(`http://localhost:3000/games/${item.id}`, updatedGameData);
      }

        sendGamesEmail(formData.to_name, formData.to_email, cartItems, totalPrice);
      }

      console.log(`Compra registrada con éxito por un total de: $${totalPrice.toFixed(2)}`);
      clearCart();
    }  catch (error) {
      console.error('Error al procesar el pago:', error);
      alert(`Hubo un error al procesar el pago: ${error.message}`);
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
