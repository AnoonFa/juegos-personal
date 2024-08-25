import React from 'react';
import { Typography, Grid, TextField, FormControlLabel, Checkbox, MenuItem } from '@mui/material';

const generateMonthYearOptions = () => {
  const options = [];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  for (let year = currentYear; year <= currentYear + 10; year++) {
    for (let month = 1; month <= 12; month++) {
      if (year === currentYear && month < currentMonth) {
        continue;
      }
      const formattedMonth = month.toString().padStart(2, '0');
      const formattedYear = year.toString().slice(-2);
      options.push({
        value: `${formattedMonth}/${formattedYear}`,
        label: `${formattedMonth}/${formattedYear}`
      });
    }
  }
  return options;
};

export default function PaymentForm({ formData, handleInputChange }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Método de Pago
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardType"
            name="cardType"
            label="Tipo de Tarjeta"
            fullWidth
            select
            value={formData.cardType}
            onChange={handleInputChange}
            helperText="Selecciona el tipo de tarjeta"
          >
            <MenuItem value="visa">Visa</MenuItem>
            <MenuItem value="mastercard">MasterCard</MenuItem>
            <MenuItem value="amex">American Express</MenuItem>
            <MenuItem value="discover">Discover</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Número de la Tarjeta"
            fullWidth
            autoComplete="cc-number"
            value={formData.cardNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 16);
              handleInputChange({ target: { name: 'cardNumber', value } });
            }}
            inputProps={{ maxLength: 16 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Fecha de Expiración"
            fullWidth
            autoComplete="cc-exp"
            select
            value={formData.expDate}
            onChange={handleInputChange}
            helperText="Selecciona la fecha de expiración"
          >
            {generateMonthYearOptions().map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Últimos tres dígitos en la franja de firma"
            fullWidth
            autoComplete="cc-csc"
            value={formData.cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 3);
              handleInputChange({ target: { name: 'cvv', value } });
            }}
            inputProps={{ maxLength: 3 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Correo Electrónico"
            fullWidth
            autoComplete="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Recordar detalles de la tarjeta para la próxima vez"
          />
        </Grid>
      </Grid>
    </>
  );
}
