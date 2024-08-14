import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';
import { statsTableTheme } from '../../theme'; // Ajusta la ruta

const StatsTables = () => {
  const games = useSelector(state => state.games.games);
  const navigate = useNavigate();

  const handleGameClick = (id) => {
    navigate(`/game/${id}`);
  };

  const columns = [
    { field: 'name', headerName: 'Juego', width: 130 },
    { field: 'category', headerName: 'Categoría', width: 150 },
    { field: 'size', headerName: 'Tamaño (KB)', type: 'number', width: 150 },
    { 
      field: 'price', 
      headerName: 'Precio', 
      type: 'number', 
      width: 130,
      valueFormatter: (params) => {
        const value = params.value;
        return value !== undefined && value !== null 
          ? `$${value.toFixed(2)}` 
          : "N/A";
      }
    },
    { field: 'licensesAvailable', headerName: 'Licencias Disponibles', type: 'number', width: 200 },
    { field: 'licensesSold', headerName: 'Licencias Vendidas', type: 'number', width: 200 },
  ];

  return (
    <ThemeProvider theme={statsTableTheme}>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid 
          rows={games} 
          columns={columns} 
          pageSize={4} 
          rowsPerPageOptions={[4]} 
          onRowClick={(params) => handleGameClick(params.row.id)} 
        />
      </div>
    </ThemeProvider>
  );
};

export default StatsTables;
