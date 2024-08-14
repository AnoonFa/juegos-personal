// SortedSalesTable.js
import React, { useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GamesContext } from '../../context/GameContext';
import { ThemeProvider } from '@mui/material/styles';
import { sortedSalesTableTheme } from '../../theme'; // Ajusta la ruta

const SortedSalesTable = () => {
  const { games } = useContext(GamesContext);

  const sortedGames = [...games].sort((a, b) => b.licensesSold - a.licensesSold);

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'category', headerName: 'Categoría', width: 130 },
    { field: 'size', headerName: 'Tamaño (KB)', type: 'number', width: 150 },
    { 
      field: 'price',
      headerName: 'Precio',
      type: 'number',
      width: 130,
      valueFormatter: ({ value }) => {
        if (value !== undefined && value !== null && !isNaN(value)) {
          return `$${value.toFixed(2)}`;
        } else {
          return "$0.00";
        }
      },
    },
    { field: 'licensesAvailable', headerName: 'Licencias Disponibles', type: 'number', width: 180 },
    { field: 'licensesSold', headerName: 'Licencias Vendidas', type: 'number', width: 180 },
    { 
      field: 'image', 
      headerName: 'Imagen', 
      width: 150, 
      renderCell: (params) => (
        <img 
          src={`path/to/images/${params.value}`} 
          alt="Game Thumbnail" 
          style={{ width: '100%', height: 'auto' }} 
        />
      )
    }
  ];

  const rows = sortedGames.map((game, index) => ({
    id: index + 1,
    name: game.name,
    category: game.category,
    size: game.size,
    price: game.price,
    licensesAvailable: game.licensesAvailable,
    licensesSold: game.licensesSold,
    image: game.image,
  }));

  return (
    <ThemeProvider theme={sortedSalesTableTheme}>
      <div style={{ height: 400, width: '100%' }}>
        <h3>Top Juegos Más Vendidos</h3>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
        />
      </div>
    </ThemeProvider>
  );
};

export default SortedSalesTable;
