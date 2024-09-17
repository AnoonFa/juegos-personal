import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { usePageTitle } from '../../context/PageTitleContext'; // Importar el contexto del título

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [games, setGames] = useState([]);
  const { setTitle } = usePageTitle(); // Obtener la función para establecer el título

  useEffect(() => {
    setTitle('Panel de Administración'); // Establecer el título de la página

    // Obtener datos desde la API falsa
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    const fetchPurchases = async () => {
      try {
        const response = await axios.get('http://localhost:3000/purchases');
        setPurchases(response.data);
      } catch (error) {
        console.error('Error al obtener compras:', error);
      }
    };

    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sales');
        setSales(response.data);
      } catch (error) {
        console.error('Error al obtener ventas:', error);
      }
    };

    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3000/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error al obtener juegos:', error);
      }
    };

    fetchUsers();
    fetchPurchases();
    fetchSales();
    fetchGames();
  }, [setTitle]);

  const handleEditUser = async (userId, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/users/${userId}`, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, ...updatedData } : user))
      );
    } catch (error) {
      console.error('Error al editar usuario:', error);
    }
  };

  return (
    <div className="admin-page">
      <Typography variant="h4" align="center" gutterBottom>
        Panel de Administración
      </Typography>

      {/* Tabla de Usuarios */}
      <Typography variant="h6" gutterBottom>
        Usuarios
      </Typography>
      <TableContainer component={Paper} className="admin-table-container">
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
            {users.map((user) => (
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
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Compras
      </Typography>
      <TableContainer component={Paper} className="admin-table-container">
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
            {purchases.map((purchase) => (
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
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Ventas
      </Typography>
      <TableContainer component={Paper} className="admin-table-container">
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
            {sales.map((sale) => (
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
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Juegos
      </Typography>
      <TableContainer component={Paper} className="admin-table-container">
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
            {games.map((game) => (
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
