import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const StatsTables = () => {
  const games = useSelector(state => state.games.games);
  const navigate = useNavigate();

  const handleGameClick = (id) => {
    navigate(`/game/${id}`);
  };

  const valueFormatter = (params) => {
    const value = params.value;
    return value !== undefined && value !== null ? value.toLocaleString() : "N/A";
  };

  const columns = [
    { field: 'name', headerName: 'Juego', width: 200 },
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
    }
  ];

  return (
    <section>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid 
          rows={games} 
          columns={columns} 
          pageSize={5} 
          rowsPerPageOptions={[5]} 
          onCellClick={(params) => handleGameClick(params.id)} 
        />
      </div>
    </section>
  );
};

export default StatsTables;