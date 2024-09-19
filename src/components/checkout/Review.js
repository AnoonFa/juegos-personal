import React, { useContext } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Card, CardContent } from '@mui/material';
import { GamesContext } from '../../context/GameContext'; // Asegúrate de importar el contexto de juegos

export default function Review({ purchaseType, cartItems }) {
  const { games } = useContext(GamesContext); // Obtener la lista de juegos desde el contexto

  // Función para obtener los detalles del juego desde el contexto usando `productId`
  const getGameDetails = (productId) => {
    return games.find(game => game.id === productId);
  };

  // Renderizar los detalles de los juegos del carrito
  const renderCartDetails = () => (
    <>
      {cartItems.map((item, index) => {
        // Verificar si `productId` está presente, de lo contrario mostrar error
        const gameDetails = item.productId ? getGameDetails(item.productId) : null;

        if (!gameDetails) {
          return <ListItem key={index}><ListItemText primary="Juego no encontrado" /></ListItem>;
        }

        return (
          <ListItem key={index}>
            <ListItemText 
              primary={`Juego: ${gameDetails.name}`} 
              secondary={`Cantidad: ${item.quantity} - Precio por unidad: $${gameDetails.price.toFixed(2)} - Subtotal: $${(gameDetails.price * item.quantity).toFixed(2)}`} 
            />
          </ListItem>
        );
      })}
    </>
  );

  // Cálculo del precio total
  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      const gameDetails = item.productId ? getGameDetails(item.productId) : null;
      if (gameDetails) {
        totalPrice += gameDetails.price * item.quantity;
      }
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
            <ListItemText 
              primary="Tipo de compra" 
              secondary={purchaseType ? purchaseType.charAt(0).toUpperCase() + purchaseType.slice(1) : 'Desconocido'} 
            />
          </ListItem>
          <Divider />
          {purchaseType === 'game' && renderCartDetails()}
          <Divider />
          <ListItem>
            <ListItemText 
              primary="Total con Descuento" 
              secondary={`$${getTotalPrice().toFixed(2)}`} 
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
