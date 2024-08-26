import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './SalesHistory.css';

const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchSales = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/sales?sellerId=${user.id}`);
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales history:', error);
      }
    };

    fetchSales();
  }, [user]);

  return (
    <div className="sales-history">
      <h3>Historial de Ventas</h3>
      {sales.length > 0 ? (
        sales.map(sale => (
          <div key={sale.id} className="sale">
            <p>Juego: {sale.gameName}</p>
            <p>Fecha: {new Date(sale.saleDate).toLocaleDateString()}</p>
            <p>Total: ${sale.pricePerUnit * sale.quantity}</p>
          </div>
        ))
      ) : (
        <p>No hay ventas registradas.</p>
      )}
    </div>
  );
};

export default SalesHistory;
