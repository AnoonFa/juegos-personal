import React from 'react';
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function AddressForm({ purchaseType, cartItems }) {
  const renderCartDetails = () => (
    <>
      {cartItems.map((item, index) => (
        <ListItem key={index}>
          <ListItemText 
            primary={`Juego: ${item.name}`} 
            secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`}
          />
        </ListItem>
      ))}
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
        Detalles de la Compra
      </Typography>
      <Grid container spacing={3}>
        {purchaseType === 'game' && renderCartDetails()}
        {purchaseType === 'membership' && renderMembershipDetails()}
      </Grid>
    </>
  );
}
