import React, { useContext } from 'react';
import { Grid, Typography, TextField, ListItem, ListItemText } from '@mui/material';
import { GamesContext } from '../../context/GameContext'; // Importa el contexto de juegos

export default function AddressForm({ formData, handleInputChange, purchaseType, cartItems }) {
  const { games } = useContext(GamesContext); // Acceder a la lista de juegos desde el contexto

  // Función para obtener los detalles del juego por productId
  const getGameDetails = (productId) => {
    return games.find(game => game.id === productId);
  };

  const renderCartDetails = () => (
    <>
      {cartItems.map((item, index) => {
        // Obtener los detalles del juego usando productId
        const gameDetails = getGameDetails(item.productId);

        if (!gameDetails) {
          return <ListItem key={index}><ListItemText primary="Juego no encontrado" /></ListItem>;
        }

        return (
          <ListItem key={index}>
            <ListItemText 
              primary={`Juego: ${gameDetails.name}`} 
              secondary={`Cantidad: ${item.quantity} - Precio: $${gameDetails.price.toFixed(2)}`} 
            />
          </ListItem>
        );
      })}
    </>
  );

  const renderMembershipDetails = () => (
    <ListItem>
      <ListItemText primary="Membresía" secondary="Acceso premium a la plataforma" />
    </ListItem>
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Información del Comprador
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="to_name"
            name="to_name"
            label="Nombre Completo"
            fullWidth
            value={formData.to_name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="to_email"
            name="to_email"
            label="Correo Electrónico"
            fullWidth
            value={formData.to_email}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Detalles de la Compra
      </Typography>
      <Grid container spacing={3}>
        {purchaseType === 'game' && renderCartDetails()}
        {purchaseType === 'membership' && renderMembershipDetails()}
      </Grid>
    </>
  );
}
