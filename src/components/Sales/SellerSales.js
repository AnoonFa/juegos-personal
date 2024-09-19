import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './SellerSales.css';

const SellerSales = () => {
  const [sales, setSales] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSales = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(`http://localhost:3000/purchases?sellerId=${user.id}`);
          setSales(response.data);
        } catch (error) {
          console.error('Error fetching sales:', error);
        }
      }
    };

    fetchSales();
  }, [user]);

  if (!user || !user.id) {
    return <p>Debes iniciar sesión para ver tus ventas.</p>;
  }

  return (
    <div className="seller-sales">
      <h1>Mis Ventas</h1>
      {sales.length > 0 ? (
        <ul>
          {sales.map((sale) => (
            <li key={sale.id} className="sale-item">
              <p>Juego: {sale.gameName || 'Nombre no disponible'}</p>
              <p>Comprador: {sale.buyerId || 'ID no disponible'}</p>
              <p>Cantidad: {sale.quantity || 0}</p>
              <p>
                Precio Total: $
                {sale.totalPrice !== null && sale.totalPrice !== undefined
                  ? sale.totalPrice.toFixed(2)
                  : '0.00'}
              </p>
              <p>Fecha de Compra: {sale.purchaseDate || 'Fecha no disponible'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No has realizado ventas aún.</p>
      )}
    </div>
  );
};

export default SellerSales;
