import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [games, setGames] = useState([]);
  const db = getFirestore();

  // Obtener usuarios desde Firebase
  const fetchUsers = async () => {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(usersList);
  };

  // Obtener compras desde Firebase
  const fetchPurchases = async () => {
    const purchasesSnapshot = await getDocs(collection(db, 'purchases'));
    const purchasesList = purchasesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPurchases(purchasesList);
  };

  // Obtener ventas desde Firebase
  const fetchSales = async () => {
    const salesSnapshot = await getDocs(collection(db, 'sales'));
    const salesList = salesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSales(salesList);
  };

  // Obtener juegos desde Firebase
  const fetchGames = async () => {
    const gamesSnapshot = await getDocs(collection(db, 'games'));
    const gamesList = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setGames(gamesList);
  };

  // Editar usuario (si es necesario)
  const handleEditUser = async (userId, updatedData) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, updatedData);
    fetchUsers(); // Refrescar la lista de usuarios
  };

  useEffect(() => {
    fetchUsers();
    fetchPurchases();
    fetchSales();
    fetchGames();
  }, []);

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>Panel de Administración</Typography>

      {/* Tabla de Usuarios */}
      <Typography variant="h6" gutterBottom>Usuarios</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Membresía</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.membership ? 'Sí' : 'No'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditUser(user.id, { membership: !user.membership })}
                  >
                    {user.membership ? 'Quitar Membresía' : 'Dar Membresía'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Tabla de Compras */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Compras</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Compra</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Juego</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map(purchase => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.id}</TableCell>
                <TableCell>{purchase.buyerId}</TableCell>
                <TableCell>{purchase.gameName}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>${purchase.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Tabla de Ventas */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Ventas</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Venta</TableCell>
              <TableCell>Vendedor</TableCell>
              <TableCell>Juego</TableCell>
              <TableCell>Cantidad Vendida</TableCell>
              <TableCell>Precio Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map(sale => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.sellerId}</TableCell>
                <TableCell>{sale.gameName}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>${sale.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Tabla de Juegos */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>Juegos</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Licencias Disponibles</TableCell>
              <TableCell>Licencias Vendidas</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map(game => (
              <TableRow key={game.id}>
                <TableCell>{game.id}</TableCell>
                <TableCell>{game.name}</TableCell>
                <TableCell>{game.category}</TableCell>
                <TableCell>{game.licensesAvailable}</TableCell>
                <TableCell>{game.licensesSold}</TableCell>
                <TableCell>${game.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminPage;
