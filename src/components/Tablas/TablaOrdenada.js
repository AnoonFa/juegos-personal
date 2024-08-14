import React, { useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GamesContext } from '../../context/GameContext';

const SortedSalesTable = () => {
  const { games } = useContext(GamesContext);

  const sortedGames = [...games].sort((a, b) => b.licensesSold - a.licensesSold);

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'category', headerName: 'Categoría', width: 130 },
    { field: 'licensesSold', headerName: 'Licencias Vendidas', type: 'number', width: 180 },
    {
      field: 'price',
      headerName: 'Precio',
      type: 'number',
      width: 130,
      valueFormatter: ({ value }) => value !== undefined && value !== null ? `$${value.toFixed(2)}` : "N/A",
    },
  ];

  const rows = sortedGames.map((game, index) => ({
    id: index + 1,
    name: game.name,
    category: game.category,
    licensesSold: game.licensesSold,
    price: game.price,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h3>Top Juegos Más Vendidos</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default SortedSalesTable;
