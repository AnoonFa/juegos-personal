import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Stepper, Step, StepLabel, Button, Typography, CssBaseline } from '@mui/material';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { getFirestore, doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import emailjs from 'emailjs-com';  // Importación para el envío de correos

// Función para enviar correos de confirmación de membresía
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

// Función para enviar correos de confirmación de compra de juegos
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
      return <AddressForm purchaseType={purchaseType} cartItems={cartItems} />;
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
    cardType: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    email: '',
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const db = getFirestore();

  const { purchaseType, cartItems } = location.state || {
    purchaseType: null,
    cartItems: []
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const isFormValid = () => {
    switch (activeStep) {
      case 1:
        return ['cardType', 'cardNumber', 'expDate', 'cvv', 'email'].every(field => formData[field].trim() !== '');
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

  const applyDiscounts = (totalPrice) => {
    let puzzleLicenses = 0;
    let sportsLicenses = 0;
    let actionLicenses = 0;

    cartItems.forEach(item => {
      if (item.category === 'rompecabezas') {
        puzzleLicenses += item.quantity;
      } else if (item.category === 'deporte') {
        sportsLicenses += item.quantity;
      } else if (item.category === 'acción') {
        actionLicenses += item.quantity;
      }
    });

    if (puzzleLicenses >= 25) {
      return totalPrice * 0.8;
    } else if (sportsLicenses >= 20 && actionLicenses >= 15) {
      return totalPrice * 0.85;
    }

    return totalPrice;
  };

  const handlePayment = async () => {
    try {
      let totalPrice = 0;
  
      if (purchaseType === 'membership') {
        totalPrice = 19;  // Precio de la membresía
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { membership: true });
  
        // Enviar correo de confirmación de membresía con validación
        sendMembershipEmail(user.displayName, formData.email);
  
      } else if (purchaseType === 'game' && cartItems.length > 0) {
        cartItems.forEach(item => {
          totalPrice += item.price * item.quantity;
        });
  
        totalPrice = applyDiscounts(totalPrice);
        totalPrice *= 1.1;
  
        for (const item of cartItems) {
          // Verificar que `sellerId` esté definido
          if (!item.sellerId) {
            throw new Error(`El juego ${item.name} no tiene un vendedor asignado.`);
          }
  
          const purchaseData = {
            buyerId: user.uid,
            sellerId: item.sellerId,
            gameId: item.id,
            quantity: item.quantity,
            purchaseDate: new Date().toISOString().split('T')[0],
            price: item.price,
            totalPrice: item.price * item.quantity,
            gameName: item.name,
          };
  
          // Registrar la compra en la colección de 'purchases'
          await addDoc(collection(db, 'purchases'), purchaseData);
  
          // Actualizar licencias vendidas y disponibles del juego en la colección 'games'
          const gameRef = doc(db, 'games', item.id);
          await updateDoc(gameRef, {
            licensesSold: item.licensesSold + item.quantity,
            licensesAvailable: item.licensesAvailable - item.quantity,
          });
        }
  
        // Enviar correo de confirmación de compra de juegos con validación
        sendGamesEmail(user.displayName, formData.email, cartItems, totalPrice);
      }
  
      console.log(`Compra registrada con éxito por un total de: $${totalPrice.toFixed(2)}`);
  
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert(`Hubo un error al procesar el pago: ${error.message}`);
    }
  };
  return (
    <>
      <CssBaseline />
      <main>
        <Paper
          sx={{
            width: '75%',
            margin: 'auto',
            marginBottom: '10.6rem',
            marginTop: '15rem',
            padding: '5rem',
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
    </>
  );
}