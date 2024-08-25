import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import './SalesHistory.css';

const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'sales'), where('sellerId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const salesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSales(salesData);
    });
    return () => unsubscribe();
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
