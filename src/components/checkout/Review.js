import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Card, CardContent } from '@mui/material';

export default function Review({ purchaseType, cartItems }) {
  const renderCartDetails = () => (
    <>
      {cartItems.map((item, index) => (
        <ListItem key={index}>
          <ListItemText 
            primary={`Juego: ${item.name}`} 
            secondary={`Cantidad: ${item.quantity} - Precio: $${item.price}`} // Usar el precio ya calculado
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

  const getTotalPrice = () => {
    if (purchaseType === 'membership') return 30000;
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price * item.quantity; // Usar el precio ya calculado
    });
    return totalPrice;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Resumen de la orden
        </Typography>
        <List disablePadding>
          <ListItem>
            <ListItemText primary="Tipo de compra" secondary={purchaseType ? purchaseType.charAt(0).toUpperCase() + purchaseType.slice(1) : 'Desconocido'} />
          </ListItem>
          <Divider />
          {purchaseType === 'game' && renderCartDetails()}
          {purchaseType === 'membership' && renderMembershipDetails()}
          <Divider />
          <ListItem>
            <ListItemText primary="Total con Descuento" secondary={`$${getTotalPrice().toFixed(2)}`} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
