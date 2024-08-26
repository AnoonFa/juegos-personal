import React from 'react';
import { Grid, Typography, TextField, ListItem, ListItemText } from '@mui/material';

export default function AddressForm({ formData, handleInputChange, purchaseType, cartItems }) {
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
